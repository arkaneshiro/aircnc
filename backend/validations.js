const { check } = require('express-validator');

const validateUserSignUp = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a first name.")
    .isLength({ max: 50 })
    .withMessage("First name cannot be more than 50 characters long."),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a last name.")
    .isLength({ max: 50 })
    .withMessage("Last name cannot be more than 50 characters long."),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an email.")
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("roleId")
    .exists({ checkFalsy: true })
    .withMessage("Please choose a role for this account.")
];

const validateUsernameAndPassword = [
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username.")
    .isLength({ min: 3, max: 50 })
    .withMessage("Please provide a username that is between 3 and 50 characters long."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password.")
    .isLength({ min: 8, max: 50 })
    .withMessage("Please provide a password that is at between 8 and 50 characters long.")
];

const userNotFound = id => {
  const err = Error(`User with id of ${id} could not be found.`);
  err.status = 404;
  err.title = 'User not found.';
  return err;
}

const kitchenNotFound = id => {
  const err = Error(`Kitchen with id of ${id} could not be found.`);
  err.status = 404;
  err.title = 'Kitchen not found.';
  return err;
};
const bookingNotFound = id => {
  const err = Error(`Booking with id of ${id} could not be found.`);
  err.status = 404;
  err.title = 'Booking not found.';
  return err;
};

const kitchenValidation = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Kitchen name cannot be null.")
    .isLength({ max: 50 })
    .withMessage("Name must not be longer than 50 characters long."),
  check("cityId")
    .exists({ checkFalsy: true })
    .withMessage("City cannot be null."),
  check("stateId")
    .exists({ checkFalsy: true })
    .withMessage("State cannot be null"),
  check("streetAddress")
    .exists({ checkFalsy: true })
    .withMessage("Street Address cannot be null")
    .isLength({ max: 100 })
    .withMessage("Street address must not be longer than 100 characters long."),
  check("hostId")
    .exists({ checkFalsy: true })
    .withMessage("Host cannot be null."),
  check("rate")
    .exists({ checkFalsy: true })
    .withMessage("Rate must not be null")
];

const guestReviewValidation = [
  check('starRating')
    .exists({ checkFalsy: true })
    .withMessage('Star Rating cannot be null')
    .isInt({ min: 1, max: 5 })
    .withMessage('Star Rating must be between 1 and 5 inclusive'),
  check('comment')
    .exists({ checkFalsy: true })
    .withMessage('comment cannot be null'),
  check('wouldHostAgain')
    .exists({ checkFalsy: true })
    .withMessage('wouldHostAgain cannot be null')
    .isBoolean()
    .withMessage('wouldHostAgain must be a boolean')
];

const bookingValidation = [
  check('startDate')
    .exists({ checkFalsy: true })
    .withMessage('Start Date cannot be null'),
  check('endDate')
    .exists({ checkFalsy: true })
    .withMessage('End Date cannot be null')
];

module.exports = {
  validateUserSignUp,
  validateUsernameAndPassword,
  kitchenNotFound,
  kitchenValidation,
  userNotFound,
  guestReviewValidation,
  bookingNotFound,
  bookingValidation
};
