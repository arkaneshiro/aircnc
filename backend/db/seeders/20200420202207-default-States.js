'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('States', [
      {stateName: 'Alabama', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Alaska', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Arizona', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Arkansas', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'California', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Colorado', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Connecticut', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Delaware', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Florida', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Georgia', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Hawaii', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Idaho', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Illinois', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Indiana', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Iowa', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Kansas', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Kentucky', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Louisiana', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Maine', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Maryland', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Massachusetts', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Michigan', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Minnesota', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Mississippi', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Missouri', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Montana', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Nebraska', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Nevada', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'New Hampshire', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'New Jersey', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'New Mexico', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'New York', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'North Carolina', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'North Dakota', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Ohio', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Oklahoma', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Oregon', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Pennsylvania', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Rhode Island', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'South Carolina', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'South Dakota', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Tennessee', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Texas', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Utah', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Vermont', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Virginia', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Washington', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'West Virginia', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Wisconsin', createdAt: new Date(), updatedAt: new Date()},
      {stateName: 'Wyoming', createdAt: new Date(), updatedAt: new Date()},
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('States', null, {});
  }
};
