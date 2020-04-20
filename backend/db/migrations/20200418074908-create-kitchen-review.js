'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('KitchenReviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kitchenId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Kitchens"
        }
      },
      authorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users"
        }
      },
      comment: {
        type: Sequelize.TEXT
      },
      starRating: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      featureBool: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      cleanRating: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      wouldRentAgain: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('KitchenReviews');
  }
};