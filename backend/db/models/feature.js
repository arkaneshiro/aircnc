'use strict';
module.exports = (sequelize, DataTypes) => {
  const Feature = sequelize.define('Feature', {
    feature: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    imgPath: {
      allowNull: false,
      type: DataTypes.STRING(255)
    }
  }, {});
  Feature.associate = function (models) {
    Feature.hasMany(models.KitchenFeature, {
      foreignKey: 'featureId'
    });
  };
  return Feature;
};
