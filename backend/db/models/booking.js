'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    startDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    isConfirmed: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    kitchenId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    renterId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    hostId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});

  Booking.associate = function (models) {
    Booking.belongsTo(models.Kitchen, {
      foreignKey: 'kitchenId'
    });

    Booking.belongsTo(models.User, {
      foreignKey: 'renterId'
    });

    Booking.belongsTo(models.User, {
      foreignKey: 'hostId'
    });
  };
  return Booking;
};
