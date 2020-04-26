'use strict';
const { Kitchen } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //generate 100 bookings randomly
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }
    const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let bookingsArr = [];
    for (let i = 1; i <= 10; i++) {

      for (let j = 1; j <= 5; j++) {
        let month = getRandomIntInclusive(0, 11);
        let day = getRandomIntInclusive(0, 27);
        let year = getRandomIntInclusive(2018, 2019);
        let guest = getRandomIntInclusive(6, 8);
        let kitchen = i
        let kitchenInfo = await Kitchen.findByPk(kitchen);
        let hostId = kitchenInfo.hostId;
        console.log(`month:${month}, date:${day}, year:${year}`);
        bookingsArr.push({
          startDate: new Date(year, month, day, 0, 0, 0),
          endDate: new Date(year, month, day, 0, 0, 0),
          isConfirmed: true,
          kitchenId: kitchen,
          renterId: guest,
          hostId: hostId,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }

      for (let j = 1; j <= 5; j++) {
        let year = getRandomIntInclusive(2020, 2023);
        let month;
        if (year == 2020) {
          month = getRandomIntInclusive(4, 11);
        } else {
          month = getRandomIntInclusive(0, 11);
        }
        let day = getRandomIntInclusive(0, 27);

        let guest = getRandomIntInclusive(6, 8);
        let kitchen = i
        let kitchenInfo = await Kitchen.findByPk(kitchen);
        let hostId = kitchenInfo.hostId;
        console.log(`month:${month}, date:${day}, year:${year}`);
        bookingsArr.push({
          startDate: new Date(year, month, day, 0, 0, 0),
          endDate: new Date(year, month, day, 0, 0, 0),
          isConfirmed: true,
          kitchenId: kitchen,
          renterId: guest,
          hostId: hostId,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }


    }


    return queryInterface.bulkInsert('Bookings', bookingsArr, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bookings', null, {});
  }
};
