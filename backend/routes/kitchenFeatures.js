const express = require("express");
const router = express.Router();
const { KitchenFeature, Kitchen } = require("../db/models");
const { asyncHandler } = require("../utils");
const { getUserToken, requireAuth } = require("../auth");

router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const {
        featureId,
        kitchenId
    } = req.body

    const kitchen = await Kitchen.findByPk(kitchenId)

    if (!kitchen || req.user.roleId !== 1 || req.user.id !== kitchen.hostId) {
        const err = Error('Unauthorized');
        err.status = 401;
        err.message = 'Not authorized to create Kitchen feature'
        err.title = 'Unauthorized'
        throw err;
    }

    const kitchenFeature = await KitchenFeature.create({
        featureId,
        kitchenId
    });

    res.status(201).json({ kitchenFeature });
}));

module.exports = router
