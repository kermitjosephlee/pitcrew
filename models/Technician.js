'use strict';
module.exports = (sequelize, DataTypes) => {
  const technician = sequelize.define('Technician', {
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    timestamps: true
  });
  technician.associate = function (models) {
    technician.hasMany(models.Ticket, {
      as: 'tix'
    })
    technician.belongsTo(models.Ride);
  };
  return technician
};