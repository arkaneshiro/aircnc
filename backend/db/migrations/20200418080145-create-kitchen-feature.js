'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('KitchenFeatures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      featureId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Features"
        }
      },
      kitchenId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Kitchens"
        }
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
    return queryInterface.dropTable('KitchenFeatures');
  }
};