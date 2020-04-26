const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User, GuestReview, Booking, Kitchen, KitchenFeature, Feature, City, State } = require("../db/models");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireAuth } = require("../auth");
const { validateUserSignUp, validateUsernameAndPassword, userNotFound, guestReviewValidation } = require("../validations");

/********************************
 *  Route '/users'
 *    POST Endpoint
 *      - creates new user
 *      - creates hashedPassword
 *      - creates new user in DB
 *      - creates a JWT token
 ********************************/
router.post(
  "/",
  validateUserSignUp,
  validateUsernameAndPassword,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const {
      userName,
      firstName,
      lastName,
      email,
      password,
      roleId
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName,
      firstName,
      lastName,
      email,
      hashedPassword,
      roleId
    });

    const token = getUserToken(user);
    res.status(201).json({
      user: { id: user.id, role: user.roleId },
      token
    });
  })
);

/******************************
 *  Route '/users/token'
 *    POST Endpoint
 *      - user login validations
 *      - creates JWT Token
 *****************************/
router.post(
  "/token",
  validateUsernameAndPassword,
  asyncHandler(async (req, res, next) => {
    const {
      userName,
      password
    } = req.body;

    const user = await User.findOne({
      where: {
        userName
      }
    });

    // validatePassword method in User model
    if (!user || !user.validatePassword(password)) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = ["The provided credentials were invalid."];
      return next(err);
    }

    const token = getUserToken(user);
    res.json({ token, user: { id: user.id, role: user.roleId } });
  })
);

/******************************************
 *  Route '/users/:id/kitchens'
 *    GET Endpoint
 *      - returns all of the hosts kitchens
 ******************************************/
router.get(
  "/:id(\\d+)/kitchens",
  asyncHandler(async (req, res) => {
    const hostId = parseInt(req.params.id, 10);
    const kitchens = await Kitchen.findAll({
      include: [{
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
        model: User,
        as: "user"
      },
      {
        model: City,
        as: "city",
        attributes: ["cityName"],
      },
      {
        model: State,
        as: "state",
        attributes: ["stateName"]
      },
      ],
      where: { hostId }
    });

    // should we allow other users query a list of the hosts kitchen through an id?
    res.json({ kitchens });
  })
);

/******************************
 *  Route '/users/id/'
 *    PUT Endpoint
 *      - sets a user to deactivated status
 *
 *****************************/

router.put('/:id(\\d+)', requireAuth, asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const deactivatedUser = await User.findByPk(userId);
  if (!deactivatedUser) {
    next(userNotFound(userId));
  }
  if (req.user.id !== deactivatedUser.id) {
    const err = Error('Unauthorized');
    err.status = 401;
    err.message = 'You are not authorized to delete this User'
    err.title = 'Unauthorized'
    throw err;
  }

  deactivatedUser.isDeactivated = true;
  await deactivatedUser.save();
  res.status(204).end();

}));


/******************************
 *  Route '/users/id/reviews'
 *    GET Endpoint
 *      - gets all reviews for a guest
 *****************************/

router.get('/:id(\\d+)/reviews', asyncHandler(async (req, res, ) => {
  const guest = await User.findByPk(req.params.id);

  if (!guest || guest.roleId !== 2) {
    const err = Error('Not Found');
    err.status = 404;
    err.message = 'Reviews Not Found'
    err.title = 'Not Found'
    throw err;
  }

  const guestReviews = await GuestReview.findAll({
    where: { guestId: req.params.id }
  })

  res.json({ guestReviews });
}));

/******************************
 *  Route '/users/id/reviews'
 *    POST Endpoint
 *      - creates a review for a guest by a host
 *
 *****************************/

router.post('/:id(\\d+)/reviews', requireAuth, guestReviewValidation, handleValidationErrors, asyncHandler(async (req, res) => {
  const guest = await User.findByPk(req.params.id);
  const author = await User.findByPk(req.user.id);//passed from requireAuth function

  if (!author || !guest) {
    const err = Error('Not Found');
    err.status = 404;
    err.message = 'User Not Found'
    err.title = 'Not Found'
    throw err;
  }

  console.log(author.roleId, guest.roleId);
  if (author.roleId !== 1 || guest.roleId !== 2) {
    const err = Error('Unauthorized');
    err.status = 401;
    err.message = 'Not authorized to leave review'
    err.title = 'Unauthorized'
    throw err;
  }
  const {
    starRating,
    comment,
    wouldHostAgain
  } = req.body

  const guestReview = await GuestReview.create({
    guestId: guest.id,
    starRating,
    comment,
    authorId: author.id,
    wouldHostAgain
  });

  res.status(201).json({
    starRating,
    comment,
    wouldHostAgain,
    guestId: guest.id,
    authorId: author.id
  })

}));

/******************************
 *  Route '/users/id/bookings'
 *    GET Endpoint
 *      - returns all of a guests bookings
 *
 *****************************/

//returns all of guest bookings
router.get('/:id(\\d+)/bookings', requireAuth, asyncHandler(async (req, res) => {
  const guest = await User.findByPk(req.params.id);
  if (!guest || guest.roleId !== 2 || req.user.id !== guest.id) {
    const err = Error('Unauthorized');
    err.status = 401;
    err.message = 'Not authorized to get booking'
    err.title = 'Unauthorized'
    throw err;
  }

  const guestBookings = await Booking.findAll({
    include: {
      model: Kitchen,
      include: [
        { model: City, as: "city" },
        { model: State, as: "state" }
      ]
    },
    where: { renterId: guest.id },
    order: [['startDate', 'ASC']]

  });

  res.json({ guestBookings });
}));

/******************************
 *  Route '/users/id/kitchens/bookings'
 *    GET Endpoint
 *      - returns all of a Hosts bookings
 *
 *****************************/
router.get('/:id(\\d+)/kitchens/bookings', requireAuth, asyncHandler(async (req, res) => {
  const host = await User.findByPk(req.params.id);
  if (!host || host.roleId !== 1 || req.user.id !== host.id) {
    const err = Error('Unauthorized');
    err.status = 401;
    err.message = 'Not authorized to view booking'
    err.title = 'Unauthorized'
    throw err;
  }

  const hostBookings = await Booking.findAll({
    include: {
      model: Kitchen,
      include: [{
        model: City,
        as: "city",
        attributes: ["cityName"],
      },
      {
        model: State,
        as: "state",
        attributes: ["stateName"]
      },],
      where: { hostId: host.id }},
      order: [['startDate', 'ASC']]
    // where: { kitchenId: Kitchen.id }
  });

  res.json({ hostBookings });
}));

module.exports = router;
