'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Kitchens', [
      {
        name: 'John\'s Personal Kitchen',
        cityId: 1,
        stateId: 32,
        streetAddress: '152 Grand Street',
        hostId: 1,
        description: 'Treat yourself to my personal kitchen in the heart of New York City! I keep only the finest groceries and equipment from around the world, so enjoy what the best has to offer.',
        imgPath: ['https://res.cloudinary.com/aircncaa/image/upload/v1587509948/dahtbdfnui4v2pvyxhvd.jpg'],
        rate: 100000000,
        lat: 40.7199023,
        lng: -73.99914260000001,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'John\'s Second Kitchen',
        cityId: 1,
        stateId: 32,
        streetAddress: '611 5th Ave',
        hostId: 1,
        description: 'Treat yourself to my second kitchen in the heart of New York City! I keep only the finest groceries and equipment from around the world, so enjoy what the best has to offer.',
        imgPath: ['https://res.cloudinary.com/aircncaa/image/upload/v1587509948/dahtbdfnui4v2pvyxhvd.jpg'],
        rate: 50000000,
        lat: 40.7583996,
        lng: -73.9764418,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Best Kitchen in San Francisco',
        cityId: 15,
        stateId: 5,
        streetAddress: '105 Grant Ave',
        hostId: 5,
        description: 'There aren\'t any better kitchens in San Francisco, trust me! I\'m Martharet Steward!',
        imgPath: ['https://res.cloudinary.com/aircncaa/image/upload/v1587509948/dahtbdfnui4v2pvyxhvd.jpg'],
        rate: 100000000,
        lat: 37.7879904,
        lng: -122.4052006,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Le Pichet',
        cityId: 15,
        stateId: 5,
        streetAddress: '240 Stockton Street',
        hostId: 2,
        description: 'You won\'t find a kitchen better stocked to make the finest French cuisine in San Fransisco',
        imgPath: ['https://res.cloudinary.com/aircncaa/image/upload/v1587509948/dahtbdfnui4v2pvyxhvd.jpg'],
        rate: 50000000,
        lat: 37.7882901,
        lng: -122.4063615,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Plump Calf',
        cityId: 2,
        stateId: 5,
        streetAddress: '189 The Grove Drive',
        hostId: 3,
        description: 'You won\'t get another chance to work in the kitchen of famed Chef Galen Lambsey\'s new restaurant! Available for a limited time.',
        imgPath: ['https://res.cloudinary.com/aircncaa/image/upload/v1587509948/dahtbdfnui4v2pvyxhvd.jpg', 'https://res.cloudinary.com/aircncaa/image/upload/v1587509948/dahtbdfnui4v2pvyxhvd.jpg'],
        rate: 500000000,
        lat: 34.07351999999999,
        lng: -118.3595218,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'San Fransisco Commissary',
        cityId: 2,
        stateId: 5,
        streetAddress: '345 Spear St',
        hostId: 4,
        description: 'Located on top of the Google offices, famed Chef Al Beige has set up a state of the art kitchen, sure to meet all your cooking needs, no matter the cuisine.',
        imgPath: ['https://res.cloudinary.com/aircncaa/image/upload/v1587509948/dahtbdfnui4v2pvyxhvd.jpg', 'https://res.cloudinary.com/aircncaa/image/upload/v1587509948/dahtbdfnui4v2pvyxhvd.jpg'],
        rate: 50000000,
        lat: 37.7906153,
        lng: -122.3895871,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Kitchens', null, {})
  }
};
