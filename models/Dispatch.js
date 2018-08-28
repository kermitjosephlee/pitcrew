'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dispatch = sequelize.define('Dispatch', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    timestamps: true
  });
  Dispatch.associate = function (models) {
    Dispatch.hasMany(models.Ride)
  };
  return Dispatch
};