'use strict';
module.exports = (sequelize, DataTypes) => {
  const KitchenFeature = sequelize.define('KitchenFeature', {
    featureId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    kitchenId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  KitchenFeature.associate = function (models) {
    KitchenFeature.belongsTo(models.Feature, {
      as: 'feature',
      foreignKey: 'featureId'
    });

    KitchenFeature.belongsTo(models.Kitchen, {
      foreignKey: 'kitchenId'
    });
  };
  return KitchenFeature;
};
