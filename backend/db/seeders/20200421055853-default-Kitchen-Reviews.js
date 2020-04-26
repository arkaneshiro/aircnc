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
      },
      {
        kitchenId: 1,
        authorId: 7,
        comment: 'Kitchen has nice tiles',
        starRating: 5,
        featureBool: true,
        cleanRating: 4,
        wouldRentAgain: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kitchenId: 1,
        authorId: 8,
        comment: 'Everything as described!',
        starRating: 5,
        featureBool: true,
        cleanRating: 4,
        wouldRentAgain: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kitchenId: 1,
        authorId: 7,
        comment: 'Do not know what all the hype is about. It\'s just a kitchen.',
        starRating: 3,
        featureBool: true,
        cleanRating: 4,
        wouldRentAgain: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kitchenId: 1,
        authorId: 8,
        comment: 'Kitchen was perfect! Fixed the drain.',
        starRating: 4,
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
