'use strict';
module.exports = (sequelize, DataTypes) => {
  const Kitchen = sequelize.define('Kitchen', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    cityId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    stateId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    streetAddress: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    hostId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    imgPath: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING(255))
    },
    rate: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Kitchen.associate = function (models) {
    Kitchen.belongsTo(models.City, {
      foreignKey: 'cityId'
    });

    Kitchen.belongsTo(models.State, {
      foreignKey: 'stateId'
    });

    Kitchen.belongsTo(models.User, {
      foreignKey: 'hostId'
    });

    Kitchen.hasMany(models.KitchenReview, {
      foreignKey: 'kitchenId'
    });

    Kitchen.hasMany(models.Booking, {
      foreignKey: 'kitchenId'
    });

    Kitchen.hasMany(models.KitchenFeature, {
      foreignKey: 'kitchenId'
    });
  };
  return Kitchen;
};
