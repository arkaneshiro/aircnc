const express = require("express");
const router = express.Router();
const { State, City } = require("../db/models");
const { asyncHandler } = require("../utils");

router.get('/states', asyncHandler(async (req, res) => {
    const states = await State.findAll();
    res.json({ states });
}));

router.get('/cities', asyncHandler(async (req, res) => {
    const cities = await City.findAll();
    res.json({ cities });
}));

module.exports = router;
