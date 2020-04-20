const express = require("express");
const router = express.Router();
const { Kitchen, User, City, State, KitchenFeature, KitchenReview } = require("../db/models");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors, kitchenNotFound, kitchenValidation } = require("../utils");

/*****************************
 *  Route '/'
 *    GET endpoint
 *      - returns all kitchens
 *    POST endpoint
 *      - creates a kitchen
 *****************************/
router.route("/")
  .get(
    asyncHandler(async (req, res) => {
      // Current display of returning all Kitchens from oldest to newest
      const kitchens = await Kitchen.findAll({
        // include: [
        //   {
        //     model: User,
        //   },
        //   {
        //     model: City
        //   },
        //   {
        //     model: State
        //   },
        //   {
        //     model: KitchenFeature
        //   },
        //   {
        //     model: KitchenReview
        //   },
        // ],
        order: [["createdAt", "DESC"]]
      });
      res.json({ kitchens });
    }))
  .post(
    kitchenValidation,
    handleValidationErrors,
    asyncHandler(asyncHandler(async (req, res) => {
      const {
        name,
        cityId,
        stateId,
        streetAddress,
        hostId,
        description,
        imgPath,
        rate
      } = req.body;

      // need to pass in logged in user id
      const kitchen = await Kitchen.create({
        name,
        cityId,
        stateId,
        streetAddress,
        hostId, // may not need
        description,
        imgPath,
        rate,
        userId: req.user.id // may need to change
      });
      res.status(201).json({ kitchen });
    }))
  );

/***************************************
 *  Route '/:id'
 *    GET endpoint
 *      - returns kitchen details by id
 *    DELETE endpoint
 *      - destroys a kitchen in DB by id
 ***************************************/
router.route("/:id(\\d+)")
  .get(
    kitchenValidation,
    asyncHandler(async (req, res, next) => {
      const { id } = parseInt(req.params.id, 10);
      const kitchen = await Kitchen.findByPk(id);

      if (kitchen) {
        res.json({ kitchen });
      } else {
        next(kitchenNotFound(id));
      }
    }))
  .delete(
    asyncHandler(async (req, res, next) => {
      const id = parseInt(req.params.id, 10);
      const kitchen = await Kitchen.findByPk(id);

      if (kitchen) {
        await kitchen.destroy();
        res.status(204).end();
      } else {
        next(kitchenNotFound(id));
      }
    })
  );

module.exports = router;
