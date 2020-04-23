const express = require("express");
const router = express.Router();
// const { Op } = require("sequelize");
const { Kitchen, User, City, State, KitchenFeature, KitchenReview, Booking, Feature } = require("../db/models");
// const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { kitchenNotFound, kitchenValidation } = require("../validations");
const { requireAuth } = require("../auth");
const fetch = require("node-fetch");

/*****************************
 *  Route "/kitchens"
 *    GET endpoint
 *      - returns all kitchens
 *****************************/
router.get(
  "/",
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
          as: "kitchenReview"
        },
      ],
      order: [["createdAt", "DESC"]] // displaying newest kitchen listings first
    });
    res.json({ kitchens });
  })
);

/*****************************
 *  Route "/kitchens"
 *    POST endpoint
 *      - creates a kitchen
 *****************************/
router.post(
  "/",
  kitchenValidation,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    // front end sets the local storage for the token and id of user
    // need to pass id from frontend
    const {
      name,
      cityId,
      stateId,
      streetAddress,
      hostId,
      description,
      imgPath,
      rate
    } = req.body;
    const kitchen = await Kitchen.create({
      name,
      cityId,
      stateId,
      streetAddress,
      hostId,
      description,
      imgPath,
      rate,
    });
    res.status(201).json({ kitchen });
  })
);

/***************************************
 *  Route "/kitchens/:id"
 *    GET endpoint
 *      - returns kitchen details by id
 ***************************************/
router.get(
  "/:id(\\d+)",
  kitchenValidation,
  asyncHandler(async (req, res, next) => {
    const id  = parseInt(req.params.id, 10);
    const kitchen = await Kitchen.findByPk(id);

    if (kitchen) {
      res.json({ kitchen });
    } else {
      next(kitchenNotFound(id));
    }
  })
);


/**************************************
*  Route '/kitchens/:id'
*    DELETE endpoint
*      - destroys a kitchen in DB by id
*      - destroys references that are tied to a kitchen
*******************************************************/
router.delete(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const kitchen = await Kitchen.findByPk(id);

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
  asyncHandler(async (req, res, next) => {
    // what are we searching on?

    // general search
    // const search = req.query.search;
    const { search } = req.body;
    // search = search.split(" ").join("+");
    console.log(search);
    // can search by city if we have a city input or drop down
    // const city = req.query.city;
    let loc;
    try {
      loc = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=AIzaSyC0YJylly9ZmkoIGcZLPO5xVNZMyuyo78c`);
      loc = await loc.json();
      loc = loc.results[0].geometry.bounds.northeast;
      console.log(loc);
    } catch (err) {
      next(err);
    }
    const lat = loc.lat;
    const lng = loc.lng;

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

    // console.log(kitchens);
    res.json({ kitchens, lat, lng });
  })
);

/********************************************
*  Route "/kitchens/:id/reviews"
*    POST endpoint
*     - creates a review for a host"s kitchen
*********************************************/
router.post(
  "/:id(\\d+)/reviews",
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
router.get(
  "/:id(\\d+)/reviews",
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
  asyncHandler(async (req, res) => {
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
router.post(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
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
      isConfirmed: false,
      renterId: req.user.id
    });

    res.json({ booking });
    // } else {
    //   next(handleBookingErrors);
    // }

  })
);

module.exports = router;
