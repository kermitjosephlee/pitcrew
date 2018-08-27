'use strict';
module.exports = (sequelize, DataTypes) => {
  const technicians = sequelize.define('technicians', {
    userName: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
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