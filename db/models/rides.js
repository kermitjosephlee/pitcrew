'use strict';
module.exports = (sequelize, DataTypes) => {
  const rides = sequelize.define('rides', {
    name: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    raceStart: DataTypes.TIME,
    raceEnd: DataTypes.TIME,
    locationStart: DataTypes.STRING,
    locationEnd: DataTypes.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }, {
    underscored: true,
    timestamps: true
  });
  rides.associate = function (models) {
    rides.hasMany(technicians, {
      as: 'tech'
    })
    rides.hasMany(tickets, {
      as: 'ticket'
    })
    rides.belongsTo(dispatchers, {
      foreignKey: 'dispatcher_id'
    });
  };
  return rides
};