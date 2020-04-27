'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }

    return queryInterface.bulkInsert('KitchenFeatures', [
      {featureId: 3, kitchenId: 1, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 5, kitchenId: 1, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 9, kitchenId: 1, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 14, kitchenId: 1, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 3, kitchenId: 2, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 5, kitchenId: 2, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 9, kitchenId: 2, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 13, kitchenId: 2, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 3, kitchenId: 3, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 5, kitchenId: 3, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 9, kitchenId: 3, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 12, kitchenId: 3, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 2, kitchenId: 4, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 4, kitchenId: 4, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 10, kitchenId: 4, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 11, kitchenId: 4, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 1, kitchenId: 5, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 4, kitchenId: 5, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 6, kitchenId: 5, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 10, kitchenId: 5, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 15, kitchenId: 5, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 3, kitchenId: 6, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 5, kitchenId: 6, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 10, kitchenId: 6, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 12, kitchenId: 6, createdAt: new Date(), updatedAt: new Date()},

      {featureId: 13, kitchenId: 7, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 14, kitchenId: 7, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 17, kitchenId: 7, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 1, kitchenId: 7, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 5, kitchenId: 7, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 7, kitchenId: 7, createdAt: new Date(), updatedAt: new Date()},

      {featureId: 2, kitchenId: 8, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 3, kitchenId: 8, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 4, kitchenId: 8, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 6, kitchenId: 8, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 11, kitchenId: 8, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 8, kitchenId: 8, createdAt: new Date(), updatedAt: new Date()},

      {featureId: 2, kitchenId: 9, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 5, kitchenId: 9, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 8, kitchenId: 9, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 15, kitchenId: 9, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 16, kitchenId: 9, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 13, kitchenId: 9, createdAt: new Date(), updatedAt: new Date()},

      {featureId: 2, kitchenId: 10, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 4, kitchenId: 10, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 8, kitchenId: 10, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 9, kitchenId: 10, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 11, kitchenId: 10, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 16, kitchenId: 10, createdAt: new Date(), updatedAt: new Date()},

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('KitchenFeatures', null, {});
  }
};
