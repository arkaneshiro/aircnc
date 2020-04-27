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
    .withMessage("Please choose a role for this account."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  check('confirmPassword', 'passwordConfirmation field must have the same value as the password field')
    .exists({ checkFalsy: true })
    .custom((value, { req }) => value === req.body.password)
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
    .withMessage("Please provide a kitchen name")
    .isLength({ max: 50 })
    .withMessage("Name must not be longer than 50 characters long."),
  check("cityId")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a city"),
  check("stateId")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a state"),
  check("streetAddress")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an address")
    .isLength({ max: 100 })
    .withMessage("Street address must not be longer than 100 characters long."),
  check("hostId")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a host"),
  check("rate")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a kitchen rate"),
  check("imgPath")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a kitchen img")
];

const KitchenReviewValidation = [
  check('starRating')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a star rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Star Rating must be between 1 and 5 inclusive'),
  check('authorId')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a authorId'),
  check('wouldRentAgain')
    .exists({ checkFalsy: true })
    .withMessage('wouldRentAgain cannot be null')
    .isBoolean()
    .withMessage('wouldHostAgain must be a boolean'),
  check('featureBool')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for featureBool')
    .isBoolean()
    .withMessage('featureBool must be a boolean'),
  check('cleanRating')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a cleanliness rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Cleanliness Rating must be between 1 and 5 inclusive'),
  check('comment')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a comment')

];

const guestReviewValidation = [
  check('starRating')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a star rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Star Rating must be between 1 and 5 inclusive'),
  check('comment')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a comment'),
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
  bookingValidation,
  KitchenReviewValidation
};
