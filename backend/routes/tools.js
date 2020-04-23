const express = require("express");
const router = express.Router();
const { State, City, Feature } = require("../db/models");
const { asyncHandler } = require("../utils");

router.get('/states', asyncHandler(async (req, res) => {
    const states = await State.findAll();
    res.json({ states });
}));

router.get('/cities', asyncHandler(async (req, res) => {
    const cities = await City.findAll();
    res.json({ cities });
}));

router.get('/features', asyncHandler(async (req, res) => {
    const features = await Feature.findAll();
    res.json({ features });
}));
module.exports = router;
