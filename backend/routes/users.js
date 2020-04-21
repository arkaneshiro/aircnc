const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User, GuestReview, Booking, Kitchen } = require("../db/models");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireAuth } = require("../auth");
const { validateUserSignUp, validateUsernameAndPassword, userNotFound, guestReviewValidation } = require("../validations");

/********************************
 *  Route '/users/'
 *    POST Endpoint
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
      user: { id: user.id },
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
  asyncHandler(async (req, res) => {
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
    res.json({ token, user: { id: user.id } });
  })
);

router.put('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const deactivatedUser = await User.findByPk(userId);
  if (req.user.id !== deactivatedUser.id) {
    const err = Error('Unauthorized');
    err.status = 401;
    err.message = 'You are not authorized to delete this User'
    err.title = 'Unauthorized'
    throw err;
  }
  if (deactivatedUser) {
    deactivatedUser.isDeactivated = true;
    await deactivatedUser.save();
    res.status(204).end();
  } else {
    next(userNotFound(userId));
  }
}));

router.get('/:id(\\d+)/reviews', asyncHandler(async (req, res, ) => {
  const guest = await User.findByPk(req.params.id);

  if (guest.roleId !== 2 || !guest) {
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

//returns all of guest bookings
router.get('/:id(\\d+)/bookings', requireAuth, asyncHandler(async (req, res) => {
  const guest = await User.findByPk(req.params.id);
  console.log(req.user.id, guest.id);
  if (!guest || guest.roleId !== 2 || req.user.id !== guest.id) {
    const err = Error('Unauthorized');
    err.status = 401;
    err.message = 'Not authorized to get booking'
    err.title = 'Unauthorized'
    throw err;
  }

  const guestBookings = await Booking.findAll({
    where: { renterId: guest.id }
  });

  res.json({ guestBookings });
}));

// returns all of a hosts bookings
router.get('/:id(\\d+)/kitchens/bookings', requireAuth, asyncHandler(async (req, res) => {
  const host = await User.findByPk(req.params.id);
  console.log(host);
  if (!host || host.roleId !== 1 || req.user.id !== host.id) {
    const err = Error('Unauthorized');
    err.status = 401;
    err.message = 'Not authorized to view booking'
    err.title = 'Unauthorized'
    throw err;
  }

  const hostBookings = await Booking.findAll({
    include: { model: Kitchen, where: { hostId: host.id } }
    // where: { kitchenId: Kitchen.id }
  });

  res.json({ hostBookings });
}));

module.exports = router;
