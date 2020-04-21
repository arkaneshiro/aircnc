'use strict';
module.exports = (sequelize, DataTypes) => {
  const KitchenReview = sequelize.define('KitchenReview', {
    kitchenId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    authorId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    comment: {
      type: DataTypes.TEXT
    },
    starRating: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    featureBool: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    cleanRating: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    wouldRentAgain: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  }, {});
  KitchenReview.associate = function (models) {
    KitchenReview.belongsTo(models.Kitchen, {
      as: 'kitchenReview',
      foreignKey: 'kitchenId'
    });

    KitchenReview.belongsTo(models.User, {
      foreignKey: 'authorId'
    });
  };
  return KitchenReview;
};
