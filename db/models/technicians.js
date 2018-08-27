'use strict';
module.exports = (sequelize, DataTypes) => {
  const technicians = sequelize.define('technicians', {
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    timestamps: true
  });
  technicians.associate = function (models) {
    technicians.hasMany(tickets, {
      as: 'ticket'
    })
    technicians.belongsTo(rides, {
      foreignKey: 'ride_id'
    });
  };
  return technicians
};