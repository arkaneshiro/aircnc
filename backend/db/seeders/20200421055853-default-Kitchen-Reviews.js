'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('KitchenReviews', [
      {
        kitchenId: 2,
        authorId: 7,
        comment: 'Kitchen was perfect! Fixed the drain.',
        starRating: 5,
        featureBool: true,
        cleanRating: 4,
        wouldRentAgain: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kitchenId: 1,
        authorId: 7,
        comment: 'Kitchen has nice tiles',
        starRating: 5,
        featureBool: true,
        cleanRating: 4,
        wouldRentAgain: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kitchenId: 1,
        authorId: 8,
        comment: 'Everything as described!',
        starRating: 5,
        featureBool: true,
        cleanRating: 4,
        wouldRentAgain: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kitchenId: 1,
        authorId: 7,
        comment: 'Do not know what all the hype is about. It\'s just a kitchen.',
        starRating: 3,
        featureBool: true,
        cleanRating: 4,
        wouldRentAgain: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kitchenId: 1,
        authorId: 8,
        comment: 'Kitchen was perfect! Fixed the drain.',
        starRating: 4,
        featureBool: true,
        cleanRating: 4,
        wouldRentAgain: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kitchenId: 10,
        authorId: 10,
        comment: 'Someone left the toilet seat up',
        starRating: 4,
        featureBool: true,
        cleanRating: 1,
        wouldRentAgain: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kitchenId: 10,
        authorId: 7,
        comment: 'Smells kind of funny in here, but once you start cooking the smell goes away! :)',
        starRating: 4,
        featureBool: true,
        cleanRating: 3,
        wouldRentAgain: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kitchenId: 10,
        authorId: 8,
        comment: 'I can shower and cook my bacon!!!',
        starRating: 5,
        featureBool: true,
        cleanRating: 5,
        wouldRentAgain: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kitchenId: 10,
        authorId: 9,
        comment: 'Perfect kitchen for those that have easily irrated stomachs',
        starRating: 5,
        featureBool: true,
        cleanRating: 5,
        wouldRentAgain: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kitchenId: 9,
        authorId: 9,
        comment: 'What a great Kitchen. I would definitely reccommend this to anyone looking for a great cooking spot',
        starRating: 5,
        featureBool: true,
        cleanRating: 5,
        wouldRentAgain: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kitchenId: 9,
        authorId: 8,
        comment: 'A song from the heart will be answered with a blessing on the head. I\'ve been blessed trying to repay my Heavenly Father for his gift to me.',
        starRating: 5,
        featureBool: true,
        cleanRating: 5,
        wouldRentAgain: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kitchenId: 9,
        authorId: 7,
        comment: 'Kitchen colors did not match my outfit. Fashionista OUT!!!',
        starRating: 5,
        featureBool: true,
        cleanRating: 5,
        wouldRentAgain: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kitchenId: 9,
        authorId: 10,
        comment: 'Kitchen colors did not match my outfit. Fashionista OUT!!!',
        starRating: 5,
        featureBool: true,
        cleanRating: 5,
        wouldRentAgain: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {kitchenId: 8,
        authorId: 10,
        comment: 'There\'s harmony and inner peace to be found in following a moral compass that points in the same direction, regardless of fashion or trend.',
        starRating: 5,
        featureBool: true,
        cleanRating: 4,
        wouldRentAgain: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {kitchenId: 8,
        authorId: 9,
        comment: 'My grandfather always said that living is like licking honey off a thorn.',
        starRating: 2,
        featureBool: true,
        cleanRating: 4,
        wouldRentAgain: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {kitchenId: 8,
        authorId: 8,
        comment: 'I really loved how I did not have to worry about cleaning',
        starRating: 5,
        featureBool: true,
        cleanRating: 5,
        wouldRentAgain: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {kitchenId: 8,
        authorId: 7,
        comment: 'Tried cooking but ended up ordering taco bell instead. Still a great kitchen though!',
        starRating: 5,
        featureBool: true,
        cleanRating: 5,
        wouldRentAgain: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {kitchenId: 7,
        authorId: 10,
        comment: 'Whats the hype about?',
        starRating: 2,
        featureBool: true,
        cleanRating: 2,
        wouldRentAgain: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ,
      {kitchenId: 7,
        authorId: 9,
        comment: 'My friend recommended this kitchen to me',
        starRating: 5,
        featureBool: true,
        cleanRating: 5,
        wouldRentAgain: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ,
      {kitchenId: 7,
        authorId: 8,
        comment: 'Very cool and modern. This boomer is very impressed!',
        starRating: 5,
        featureBool: true,
        cleanRating: 5,
        wouldRentAgain: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {kitchenId: 7,
        authorId: 7,
        comment: 'Host gave me the wong address and I ended up eating at a taco bell. Very unproffesional!',
        starRating: 1,
        featureBool: false,
        cleanRating: 1,
        wouldRentAgain: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('KitchenReviews', null, {});
  }
};
