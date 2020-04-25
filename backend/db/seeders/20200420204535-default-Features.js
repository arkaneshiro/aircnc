'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Features', [
      { feature: 'Electric Burner', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Gas Burner', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Induction Range', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Electric Oven', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Convection Oven', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Less Than 100sq. ft', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: '100 to 200sq. ft.', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'More Than 200sq.ft', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Open Plan', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Closed Plan', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Basic Ingredients Available', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Basic Kitchen Gadgets', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Prepaid Cleanup', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Pots And Pans', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Utensils And Dishware', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Extra Appliances', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Dishwasher', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Range Hood', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Warming Drawer', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Microwave', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Pressure Cooker', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Features', null, {})
  }
};
