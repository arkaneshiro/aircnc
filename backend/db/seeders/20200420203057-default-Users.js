'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Hasakitchenford',
        email: 'ohboyiloveowningakitchen@kitchenowners.com',
        hashedPassword: '$2a$10$YEqFIcgLZXIgS63WNvUKPetcQv7eTMkBFYYyxFsVsS1HV1ltSOCH2',
        userName: 'Johnlovescooking',
        roleId: 1,
        isDeactivated: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Joan',
        lastName: 'Isachef',
        email: 'amazingkitchens@kitchenowners.com',
        hashedPassword: '$2a$10$YEqFIcgLZXIgS63WNvUKPetcQv7eTMkBFYYyxFsVsS1HV1ltSOCH2',
        userName: 'Chef Joan',
        roleId: 1,
        isDeactivated: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Galen',
        lastName: 'Lambsey',
        email: 'itsgreeeen@kitchenowners.com',
        hashedPassword: '$2a$10$YEqFIcgLZXIgS63WNvUKPetcQv7eTMkBFYYyxFsVsS1HV1ltSOCH2',
        userName: 'Lovely Kitchens',
        roleId: 1,
        isDeactivated: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Al',
        lastName: 'Beige',
        email: 'greateats@kitchenowners.com',
        hashedPassword: '$2a$10$YEqFIcgLZXIgS63WNvUKPetcQv7eTMkBFYYyxFsVsS1HV1ltSOCH2',
        userName: 'Al\'s Great Kitchens',
        roleId: 1,
        isDeactivated: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Martharet',
        lastName: 'Steward',
        email: 'food@kitchenowners.com',
        hashedPassword: '$2a$10$YEqFIcgLZXIgS63WNvUKPetcQv7eTMkBFYYyxFsVsS1HV1ltSOCH2',
        userName: 'Criminally Beautiful Kitchens',
        roleId: 1,
        isDeactivated: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'demo',
        lastName: 'host',
        email: 'demo_host@demohost.com',
        hashedPassword: '$2a$10$zzd031Ih5DEbiIXTBFVWGOV/pmK8cRsL4fcCB7TQJMrsKRvnro1sO',
        userName: 'demo_host',
        roleId: 1,
        isDeactivated: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Jontan',
        lastName: 'Leandoer',
        email: 'sbe@kitchenrenters.com',
        hashedPassword: '$2a$10$YEqFIcgLZXIgS63WNvUKPetcQv7eTMkBFYYyxFsVsS1HV1ltSOCH2',
        userName: 'Jon',
        roleId: 2,
        isDeactivated: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Benjamin',
        lastName: 'Reichwald',
        email: 'dg@kitchenrenters.com',
        hashedPassword: '$2a$10$YEqFIcgLZXIgS63WNvUKPetcQv7eTMkBFYYyxFsVsS1HV1ltSOCH2',
        userName: 'Steve Jobs',
        roleId: 2,
        isDeactivated: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Mike',
        lastName: 'Kinsella',
        email: 'af@kitchenrenters.com',
        hashedPassword: '$2a$10$YEqFIcgLZXIgS63WNvUKPetcQv7eTMkBFYYyxFsVsS1HV1ltSOCH2',
        userName: 'Owen',
        roleId: 2,
        isDeactivated: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'demo',
        lastName: 'guest',
        email: 'demo_guest@demoguest.com',
        hashedPassword: '$2a$10$n29zeUVJgwDHFp4BvTs4rOa1AWC.n9.CxKQHYmPxn.zSXZoxi9/Lu',
        userName: 'demo_guest',
        roleId: 2,
        isDeactivated: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
