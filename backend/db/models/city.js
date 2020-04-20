'use strict';
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    cityName: {
      allowNull: false,
      type: DataTypes.STRING(50)
    }
  }, {});
  City.associate = function (models) {
    City.hasMany(models.Kitchen, {
      foreignKey: 'cityId'
    });
  };
  return City;
};
