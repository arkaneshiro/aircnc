const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User, GuestReview, Booking, Kitchen } = require("../db/models");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireAuth } = require("../auth");
const { validateUserSignUp, validateUsernameAndPassword, userNotFound, guestReviewValidation, bookingNotFound, bookingValidation } = require("../validations");


/********************************
 *  Route '/bookings/:id'
 *    GET Endpoint
 *      - returns one booking
 ********************************/
router.get(
    "/:id(\\d+)",
    bookingValidation,
    asyncHandler(async (req, res, next) => {
      const id = parseInt(req.params.id, 10);
      const booking = await Booking.findByPk(id);

      if (booking) {
        res.json({ booking });
      } else {
        next(bookingNotFound(id));
      }
    }))

 /********************************
 *  Route '/bookings/:id'
 *    PATCH Endpoint
 *      - changes isConfirmed
 *        property
 ********************************/
router.patch(
    '/:id(\\d+)',
    requireAuth,
    asyncHandler(async (req, res, next) => {
    const bookingId = req.params.id;
    const currentBooking = await Booking.findByPk(bookingId, {
        includes: {Kitchen: { where: { id: req.user.id } }}
    });

    if (!currentBooking) {
        next(bookingNotFound(bookingId))
    }

    if ((req.user.id !== currentBooking.renterId) && (req.user.id !== currentBooking.hostId)) {
      const err = Error('Unauthorized');
      err.status = 401;
      err.message = 'You are not authorized to cancel this booking'
      err.title = 'Unauthorized'
      throw err;
    }

    currentBooking.isConfirmed = false;
    await currentBooking.save();
    res.status(204).end();

  }));

module.exports = router;