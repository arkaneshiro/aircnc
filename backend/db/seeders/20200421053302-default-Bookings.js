'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookings', [
      {
        startDate: new Date('December 17, 2001'),
        endDate: new Date('April 20, 2020'),
        isConfirmed: true,
        kitchenId: 3,
        renterId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        startDate: new Date('December 12, 2002'),
        endDate: new Date('January 7, 2003'),
        isConfirmed: true,
        kitchenId: 2,
        renterId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        startDate: new Date('September 14, 1999'),
        endDate: new Date('March 22, 2019'),
        isConfirmed: true,
        kitchenId: 4,
        renterId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        startDate: new Date('September 23, 1999'),
        endDate: new Date('March 5, 2019'),
        isConfirmed: true,
        kitchenId: 3,
        renterId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        startDate: new Date('September 23, 1999'),
        endDate: new Date('March 5, 2019'),
        isConfirmed: true,
        kitchenId: 1,
        renterId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bookings', null, {});
  }
};
