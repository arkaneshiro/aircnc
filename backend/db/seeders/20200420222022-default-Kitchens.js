'use strict';

const faker = require('faker');

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
        imgPath: ["https://images.unsplash.com/photo-1556912173-3bb406ef7e77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
          "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=760&q=80",
          "https://images.unsplash.com/photo-1556037843-347ddff9f4b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"],
        rate: 150,
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
        rate: 175,
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
        rate: 90,
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
        rate: 100,
        lat: 37.7882901,
        lng: -122.4063615,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Plump Calf',
        cityId: 15,
        stateId: 5,
        streetAddress: '189 The Grove Drive',
        hostId: 3,
        description: 'You won\'t get another chance to work in the kitchen of famed Chef Galen Lambsey\'s new restaurant! Available for a limited time.',
        imgPath: ['https://res.cloudinary.com/aircncaa/image/upload/v1587509948/dahtbdfnui4v2pvyxhvd.jpg', 'https://res.cloudinary.com/aircncaa/image/upload/v1587509948/dahtbdfnui4v2pvyxhvd.jpg'],
        rate: 175,
        lat: 34.07351999999999,
        lng: -118.3595218,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'San Fransisco Commissary',
        cityId: 15,
        stateId: 5,
        streetAddress: '345 Spear St',
        hostId: 4,
        description: 'Located on top of the Google offices, famed Chef Al Beige has set up a state of the art kitchen, sure to meet all your cooking needs, no matter the cuisine.',
        imgPath: ['https://res.cloudinary.com/aircncaa/image/upload/v1587509948/dahtbdfnui4v2pvyxhvd.jpg', 'https://res.cloudinary.com/aircncaa/image/upload/v1587509948/dahtbdfnui4v2pvyxhvd.jpg'],
        rate: 125,
        lat: 37.7906153,
        lng: -122.3895871,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Modern New York Kitchen',
        cityId: 1,
        stateId: 32,
        streetAddress: '3095 Hoffman Avenue',
        hostId: 2,
        description: 'Modern kitchen with lots of appliances',
        imgPath: ['https://res.cloudinary.com/aircncaa/image/upload/v1587509948/dahtbdfnui4v2pvyxhvd.jpg'],
        rate: 150,
        lat: 40.712914,
        lng: -73.7285039,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Arts and Crafts Kitchen',
        cityId: 15,
        stateId: 5,
        streetAddress: '1674 Boring Lane',
        hostId: 3,
        description: 'Kitchen with lots of utensils for baking!',
        imgPath: ['https://res.cloudinary.com/aircncaa/image/upload/v1587509948/dahtbdfnui4v2pvyxhvd.jpg'],
        rate: 150,
        lat: 37.7576792,
        lng: -122.5078114,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Contemporary Kitchen',
        cityId: 15,
        stateId: 5,
        streetAddress: '137 Clifford Street',
        hostId: 2,
        description: 'Contemporary kitchen designs date from the 1940s to the present, and trace many of their stylistic origins in Europe.',
        imgPath: ['https://res.cloudinary.com/aircncaa/image/upload/v1587509948/dahtbdfnui4v2pvyxhvd.jpg'],
        rate: 150,
        lat: 40.7199023,
        lng: -73.99914260000001,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Country Kitchen',
        cityId: 19,
        stateId: 6,
        streetAddress: '3647 Leo Street',
        hostId: 3,
        description: 'Kitchen you would find on a ranch. Smells like cow shit.',
        imgPath: ['https://res.cloudinary.com/aircncaa/image/upload/v1587509948/dahtbdfnui4v2pvyxhvd.jpg'],
        rate: 150,
        lat: 39.682041,
        lng: -105.067307,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Kitchens', null, {})
  }
};
