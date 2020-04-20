const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User, Kitchen } = require("../db/models");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireAuth } = require("../auth");
const { validateUserSignUp, validateUsernameAndPassword } = require("../validations");

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
      where: {
        hostId
      }
    });

    // should we allow other users query a list of the hosts kitchen through an id?
    res.json({ kitchens });
  })
);

module.exports = router;