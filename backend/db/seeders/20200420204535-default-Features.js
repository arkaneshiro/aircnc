'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Features', [
      { feature: 'Electric Burner', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Gas Burner', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Induction Range', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Gas Oven', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Convection Oven', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'less than 100sq. ft', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: '100 to 200sq. ft.', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'more than 200sq.ft', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Open plan', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Closed plan', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Basic ingredients available', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Modern Style', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Brutalist Style', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Memphis Style', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Cabin Style', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Features', null, {})
  }
};
