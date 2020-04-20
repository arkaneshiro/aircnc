'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Kitchens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      cityId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Cities"
        }
      },
      stateId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "States"
        }
      },
      streetAddress: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      hostId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users"
        }
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      imgPath: {
        type: Sequelize.STRING(255)
      },
      rate: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Kitchens');
  }
};