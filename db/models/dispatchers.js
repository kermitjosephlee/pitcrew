'use strict';
module.exports = (sequelize, DataTypes) => {
  const dispatchers = sequelize.define('dispatchers', {
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }, {
    timestamps: true
  });
  dispatchers.associate = function (models) {
    dispatchers.hasMany(rides, {
      as: 'ride'
    })
  };
  return dispatchers
};