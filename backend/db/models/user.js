'use strict';
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(100),
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY,
    },
    userName: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(50),
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    isDeactivated: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  }, {});

  User.associate = function (models) {
    User.belongsTo(models.Role, {
      foreignKey: 'roleId'
    });

    User.hasMany(models.GuestReview, {
      as: 'renter',
      foreignKey: 'guestId'
    });

    User.hasMany(models.GuestReview, {
      as: 'host',
      foreignKey: 'authorId'
    });

    User.hasMany(models.Kitchen, {
      foreignKey: 'hostId'
    });

    User.hasMany(models.KitchenReview, {
      foreignKey: 'userId'
    });

    User.hasMany(models.Booking, {
      foreignKey: 'renterId'
    });
  };

  User.prototype.validatePassword = function (password) {
    // because this is a model instance method, `this` is the user instance here:
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  return User;
};
