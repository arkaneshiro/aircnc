'use strict';
module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    stateName: {
      allowNull: false,
      type: DataTypes.STRING(50)
    }
  }, {});
  State.associate = function (models) {
    State.hasMany(models.Kitchen, {
      foreignKey: 'stateId'
    });
  };
  return State;
};
