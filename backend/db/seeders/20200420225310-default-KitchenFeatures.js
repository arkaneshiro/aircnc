'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('KitchenFeatures', [
      {featureId: 3, kitchenId: 1, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 5, kitchenId: 1, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 8, kitchenId: 1, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 9, kitchenId: 1, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 14, kitchenId: 1, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 3, kitchenId: 2, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 5, kitchenId: 2, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 8, kitchenId: 2, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 9, kitchenId: 2, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 13, kitchenId: 2, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 3, kitchenId: 3, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 5, kitchenId: 3, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 7, kitchenId: 3, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 9, kitchenId: 3, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 12, kitchenId: 3, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 2, kitchenId: 4, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 4, kitchenId: 4, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 8, kitchenId: 4, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 10, kitchenId: 4, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 11, kitchenId: 4, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 1, kitchenId: 5, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 4, kitchenId: 5, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 6, kitchenId: 5, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 10, kitchenId: 5, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 15, kitchenId: 5, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 3, kitchenId: 6, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 5, kitchenId: 6, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 8, kitchenId: 6, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 10, kitchenId: 6, createdAt: new Date(), updatedAt: new Date()},
      {featureId: 12, kitchenId: 6, createdAt: new Date(), updatedAt: new Date()},

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('KitchenFeatures', null, {});
  }
};
