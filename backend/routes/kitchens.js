const express = require("express");
const router = express.Router();
// const { Op } = require("sequelize");
const { Kitchen, User, City, State, KitchenFeature, KitchenReview, Booking, Feature } = require("../db/models");
// const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { kitchenNotFound, kitchenValidation, KitchenReviewValidation } = require("../validations");
const { requireAuth } = require("../auth");
const fetch = require("node-fetch");

/*****************************
 *  Route "/kitchens"
 *    GET endpoint
 *      - returns all kitchens
 *****************************/

// has to be logged in?
// user has to be guest to view kitchens?

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    // Currently displaying all Kitchens from oldest to newest
    const kitchens = await Kitchen.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["firstName", "lastName", "userName"]
        },
        {
          model: City,
          as: "city",
          attributes: ["cityName"]
        },
        {
          model: State,
          as: "state",
          attributes: ["stateName"]
        },
        {
          model: KitchenFeature,
          as: "kitchenFeature",
          include: [
            {
              model: Feature,
              as: "feature",
              attributes: ["feature", "imgPath"] // *** may not need imgPath
            }
          ]
        },
        {
          model: KitchenReview,
          as: "kitchenReview",
          attributes: ["starRating", "wouldRentAgain"]
        },
      ],
      order: [["createdAt", "DESC"]] // displaying newest kitchen listings first
    });
    res.json({ kitchens });
  })
);

/***********************************************
 *  Route "/kitchens"
 *    POST endpoint
 *      - creates a kitchen
 *      - calls Google Maps API to get geocode
 *        to get lat and lng
 ***********************************************/
// only host can create kitchen
// token authentication
//  validations not showing specific error?
router.post(
  "/",
  requireAuth,
  kitchenValidation,
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    // front end sets the local storage for the token and id of user
    // need to pass id from frontend
    let {
      name,
      cityId,
      stateId,
      streetAddress,
      hostId,
      description,
      imgPath,
      rate
    } = req.body;

    if (req.user.id !== hostId || req.user.roleId !== 1) {
      const err = Error('Unauthorized');
      err.status = 401;
      err.message = 'Not authorized to create Kitchen'
      err.title = 'Unauthorized'
      throw err;
    }

    let cityName = await City.findByPk(cityId);
    cityName = cityName.dataValues.cityName;

    urlencodedStreetAddress = streetAddress.split(" ").join("+");

    let loc;
    try {
      loc = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlencodedStreetAddress}+${cityName}&key=AIzaSyC0YJylly9ZmkoIGcZLPO5xVNZMyuyo78c`);
      loc = await loc.json();
      loc = loc.results[0].geometry.bounds.northeast;
      console.log(loc);
    } catch (err) {
      next(err);
    }

    // add validation if the street address is found on google maps
    const lat = parseFloat(loc.lat);
    const lng = parseFloat(loc.lng);

    const kitchen = await Kitchen.create({
      name,
      cityId,
      stateId,
      streetAddress,
      hostId,
      description,
      imgPath,
      rate,
      lat,
      lng
    });

    res.status(201).json({ kitchen });
  })
);

/***************************************
 *  Route "/kitchens/:id"
 *    GET endpoint
 *      - returns kitchen details by id
 ***************************************/

// not working for me
// have to be loggine in to get a kitchen and be a guest?
// we dont need kitchen validations?
router.get(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const kitchenId = parseInt(req.params.id, 10);
    const kitchen = await Kitchen.findByPk(kitchenId, {
      include: [
        {
          model: City,
          as: "city"

        },
        {
          model: State,
          as: "state",
        },
        {
          model: User,
          as: "user"
        }
      ]
    });
    
    const kitchenFeatures = await KitchenFeature.findAll({
      include: [{
        model: Feature,
        as: "feature",
        attributes: ["feature", "imgPath"],
      }],
      where: {
        kitchenId
      }
    });

    const kitchenReviews = await KitchenReview.findAll({
      include: [
        {
          model: User,
        }
      ],
      where: {
        kitchenId
      },
      attributes: ["starRating", "comment"]
    });

    let sumOfRating = 0;
    kitchenReviews.forEach(rating => {
      sumOfRating += rating.dataValues.starRating
    });

    sumOfRating /= kitchenReviews.length;
    if (kitchen) {
      res.json({
        kitchen,
        kitchenFeatures,
        starRating: (sumOfRating ? sumOfRating : 0),
        kitchenReviews
      });
    } else {
      next(kitchenNotFound(id));
    }
  })
);


/******************************************************
*  Route "/kitchens/:id"
*    DELETE endpoint
*      - destroys a kitchen in DB by id
*      - destroys references that are tied to a kitchen
*******************************************************/
router.delete(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const kitchen = await Kitchen.findByPk(id);

    if (!kitchen || kitchen.hostId !== req.user.id) {
      const err = Error('Unauthorized');
      err.status = 401;
      err.message = 'Not authorized to delete Kitchen'
      err.title = 'Unauthorized'
      throw err;
    }

    if (kitchen) {
      await kitchen.destroy();
      res.status(204).end();
    } else {
      next(kitchenNotFound(id));
    }
  })
);

/*******************************************************
*  Route "/kitchens/search"
*    POST endpoint
*     - returns a list of kitchen based on query params
********************************************************/
router.post(
  "/search",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    // what are we searching on?

    const { search } = req.body;

    const kitchens = await Kitchen.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["firstName", "lastName", "userName"]
        },
        {
          model: City,
          as: "city",
          attributes: ["cityName"],
          where: {
            cityName: search
          }
        },
        {
          model: State,
          as: "state",
          attributes: ["stateName"]
        },
        {
          model: KitchenFeature,
          as: "kitchenFeature",
          include: [
            {
              model: Feature,
              as: "feature",
              attributes: ["feature", "imgPath"] // *** may not need imgPath
            }
          ]
        },
        {
          model: KitchenReview,
          as: "kitchenReview"
        },
      ],
      order: [["createdAt", "DESC"]] // displaying newest kitchen listings first
    });

    if (kitchens) {
      res.json({ kitchens });
    } else {
      next(res);
    }
    // console.log(kitchens);
  })
);

/********************************************
*  Route "/kitchens/:id/reviews"
*    POST endpoint
*     - creates a review for a host"s kitchen
*********************************************/
// need user auth
// check if user/author is role of guest
// validations for reviews
router.post(
  "/:id(\\d+)/reviews",
  KitchenReviewValidation,
  handleValidationErrors,
  requireAuth,
  //validation to check if user is logged in?
  asyncHandler(async (req, res) => {
    // may need validation that the user.isDeactivated === false

    // will hosts be able to leave other host"s kitchen"s reviews?

    const kitchenId = parseInt(req.params.id, 10);
    const {
      authorId,
      comment,
      starRating,
      featureBool,
      cleanRating,
      wouldRentAgain
    } = req.body;

    // console.log(`this is the first condition: ${authorId}`)
    // console.log(`this is the second condition: ${req.user.isDeactivated === true}`)

    if ((req.user.roleId === 1 || req.user.id.toString() !== authorId.toString()) || req.user.isDeactivated === true) {
      const err = Error('Unauthorized');
      err.status = 401;
      err.message = 'Not authorized to leave review on Kitchen'
      err.title = 'Unauthorized'
      throw err;
    }

    const kitchenReview = await KitchenReview.create({
      kitchenId,
      authorId,
      comment,
      starRating,
      featureBool,
      cleanRating,
      wouldRentAgain
    });

    res.status(201).json({ kitchenReview });
  })
);

/***********************************************
*  Route "/kitchens/:id/reviews"
*    GET endpoint
*     - returns a list of the kitchen"s reviews
************************************************/
//check if user is guest
// user auth
router.get(
  "/:id(\\d+)/reviews",
  requireAuth,
  //validation to check if user is logged in?
  asyncHandler(async (req, res) => {
    // may need validation that the user.isDeactivated === false

    const kitchenId = parseInt(req.params.id, 10);
    const kitchenReviews = await KitchenReview.findAll({
      where: {
        kitchenId
      }
    });

    res.json({ kitchenReviews });
  })
);

/***********************************************
*  Route "/kitchens/:id/bookings"
*    GET endpoint
*     - returns a list of booking for a kitchen
************************************************/
router.get(
  "/:id(\\d+)/bookings",
  requireAuth,
  asyncHandler(async (req, res) => {

    if (req.user.roleId !== 1 || req.user.isDeactivated === true) {
      const err = Error('Unauthorized');
      err.status = 401;
      err.message = 'Not authorized to get boookings on Kitchen'
      err.title = 'Unauthorized'
      throw err;
    }

    const kitchenId = parseInt(req.params.id, 10);
    const bookings = await Booking.findAll({
      where: {
        kitchenId
      }
    });

    res.json({ bookings });
  })
);

/***********************************************
*  Route "/kitchens/:id"
*    POST endpoint
*     - Guest creates a booking for a kitchen
************************************************/
//check if user has role of guest
// validations for bookings
// res.status 201
router.post(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {

    if (req.user.roleId !== 2 || req.user.isDeactivated === true) {
      const err = Error('Unauthorized');
      err.status = 401;
      err.message = 'Not authorized to create boooking on Kitchen'
      err.title = 'Unauthorized'
      throw err;
    }


    const kitchenId = parseInt(req.params.id, 10)
    const kitchen = await Kitchen.findByPk(kitchenId);
    const {
      startDate,
      endDate,
    } = req.body;

    // ***** logic to check if there is a booking beteen the start and end time *****
    // index on start and end dates of kitchen rentals

    // const conflictingBookings = await Bookings.findAll({
    //   where: {
    //     kitchenId,
    //   }
    // });

    // if (!conflictingBookings) {
    const booking = await Booking.create({
      hostId: kitchen.hostId,
      kitchenId,
      startDate,
      endDate,
      isConfirmed: true,
      renterId: req.user.id
    });

    res.status(201).json({ booking });
    // } else {
    //   next(handleBookingErrors);
    // }

  })
);

module.exports = router;
