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

const kitchenNotFound = id => {
  const err = Error(`Kitchen with id of ${id} could not be found.`);
  err.status = 404;
  err.title = 'Kitchen not found.';
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

module.exports = {
  validateUserSignUp,
  validateUsernameAndPassword,
  kitchenNotFound,
  kitchenValidation
};
