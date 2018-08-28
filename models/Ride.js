'use strict';
module.exports = (sequelize, DataTypes) => {
  const ride = sequelize.define('Ride', {
    name: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    timeStart: DataTypes.TIME,
    timeEnd: DataTypes.TIME,
    latStart: DataTypes.STRING,
    longStart: DataTypes.STRING,
    latEnd: DataTypes.STRING,
    longEnd: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    timestamps: true
  });
  ride.associate = function (models) {
    ride.hasMany(models.Technician, {
      as: 'tech'
    })
    ride.hasMany(models.Ticket, {
      as: 'tix'
    })
    ride.belongsTo(models.Dispatch);
  };
  return ride
};