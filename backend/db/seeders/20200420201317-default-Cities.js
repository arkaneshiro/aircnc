'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cities', [
      {cityName: 'New York', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'Los Angeles', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'Chicago', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'Houston', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'Phoenix', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'Philadelphia', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'San Antonio', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'San Diego', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'Dallas', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'San Jose', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'Austin', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'Jacksonville', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'Fort Worth', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'Columbus', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'San Fransisco', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'Charlotte', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'Indianapolis', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'Seattle', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'Denver', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'Washington', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'Boston', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'El Paso', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'Detroit', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'Nashville', createdAt: new Date(), updatedAt: new Date()},
      {cityName: 'Portland', createdAt: new Date(), updatedAt: new Date()},
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cities', null, {});
  }
};
