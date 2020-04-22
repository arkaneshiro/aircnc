'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('GuestReviews', [
      {
        guestId: 8,
        starRating: 4,
        comment: 'Mike was lovely!',
        authorId: 2,
        wouldHostAgain: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        guestId: 7,
        starRating: 5,
        comment: 'Ben was very tidy! They even cleaned out the drain I\'ve been having issues with!',
        authorId: 1,
        wouldHostAgain: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('GuestReviews', null, {});
  }
};
