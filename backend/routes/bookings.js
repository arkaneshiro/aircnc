const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
const { Booking, Kitchen } = require("../db/models");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireAuth } = require("../auth");
const { bookingNotFound, bookingValidation } = require("../validations");


/********************************
 *  Route '/bookings/:id'
 *    GET Endpoint
 *      - returns one booking
 ********************************/
// check if user has id equal to hostId or Guest Id
//authenticate user

router.get(
  "/:id(\\d+)",
  bookingValidation,
  asyncHandler(async (req, res, next) => {
    const bookingId = parseInt(req.params.id, 10);
    const booking = await Booking.findAll({
      include: { model: Kitchen },
      where: { id: bookingId }
    });

    if(!booking) {
      next(bookingNotFound(id))
    }

    res.json({ booking });

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
      includes: { Kitchen: { where: { id: req.user.id } } }
    });

    if (!currentBooking) {
      next(bookingNotFound(bookingId))
    }
    console.log(req.user.id, currentBooking.renterId, currentBooking.hostId)
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
