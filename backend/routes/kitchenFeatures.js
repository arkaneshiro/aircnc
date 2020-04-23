const express = require("express");
const router = express.Router();
const { KitchenFeature } = require("../db/models");
const { asyncHandler } = require("../utils");


router.post('/', asyncHandler(async (req, res) => {
    const {
        featureId,
        kitchenId
    } = req.body

    const kitchenFeature = await KitchenFeature.create({
        featureId,
        kitchenId
    });

    res.status(201).json({ kitchenFeature });
}));

module.exports = router
