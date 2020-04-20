const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../db/models");
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
      username,
      password
    } = req.body;

    const user = await User.findOne({
      where: {
        username
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

module.exports = router;