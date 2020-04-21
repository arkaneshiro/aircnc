const express = require("express");
const router = express.Router();
const { Kitchen, User, City, State, KitchenFeature, KitchenReview } = require("../db/models");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors, kitchenNotFound, kitchenValidation } = require("../utils");



/*****************************
 *  Route '/kitchens'
 *    GET endpoint
 *      - returns all kitchens
 *    POST endpoint
 *      - creates a kitchen
 *****************************/
router.get(
  "/",
  asyncHandler(async (req, res) => {
    // Current display of returning all Kitchens from oldest to newest
    const kitchens = await Kitchen.findAll({
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName", "userName"]
        },
        {
          model: City,
          attributes: ["cityName"]
        },
        {
          model: State,
          attributes: ["stateName"]
        },
        {
          model: KitchenFeature,
          include: [
            {
              model: Feature,
              attributes: ["feature", "imgPath"] // *** may not need imgPath
            }
          ]
        },
        // *** are we displaying kitchen reviews when we return a list of kitchens?
        // {
        //   model: KitchenReview
        // },
      ],
      order: [["createdAt", "DESC"]] // displaying newest kitchen listings first
    });
    res.json({ kitchens });
  })
);

/***************************************
 *  Route '/kitchens/:id'
 *    GET endpoint
 *      - returns kitchen details by id
 *    DELETE endpoint
 *      - destroys a kitchen in DB by id
 ***************************************/
router.get(
  "/:id(\\d+)",
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

/*******************************************************
*  Route '/kitchens/search'
*    POST endpoint
*     - returns a list of kitchen based on query params
********************************************************/
// router.post(
//   "/search",
//   asyncHandler(async (req, res) => {
//     // what are we searching on?

//     // general search
//     const search = req.query.search;

//     // can search by city if we have a city input or drop down
//     const city = req.query.city;


//   })
// );

module.exports = router;
