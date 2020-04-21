'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('KitchenReviews', [
      {
        kitchenId: 2,
        authorId: 7,
        comment: 'Kitchen was perfect! Fixed the drain.',
        starRating: 5,
        featureBool: true,
        cleanRating: 4,
        wouldRentAgain: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('KitchenReviews', null, {});
  }
};
