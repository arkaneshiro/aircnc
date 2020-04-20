'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role: {
      allowNull: false,
      type: DataTypes.STRING(50)
    }
  }, {});
  Role.associate = function (models) {
    Role.hasMany(models.User, {
      foreignKey: 'roleId'
    });
  };
  return Role;
};
