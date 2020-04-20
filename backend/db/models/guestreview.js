'use strict';
module.exports = (sequelize, DataTypes) => {
  const GuestReview = sequelize.define('GuestReview', {
    guestId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    starRating: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    comment: {
      type: DataTypes.TEXT
    },
    authorId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    wouldHostAgain: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  }, {});

  GuestReview.associate = function (models) {
    GuestReview.belongsTo(models.User, {
      as: 'guest',
      foreignKey: 'guestId'
    });

    GuestReview.belongsTo(models.User, {
      as: 'author',
      foreignKey: 'authorId'
    });
  }
  return GuestReview;
};
