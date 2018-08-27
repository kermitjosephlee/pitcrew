'use strict';
module.exports = (sequelize, DataTypes) => {
  const rides = sequelize.define('rides', {
    name: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    timeStart: DataTypes.TIME,
    timeEnd: DataTypes.TIME,
    latStart: DataTypes.STRING,
    longStart: DataTypes.STRING,
    latEnd: DataTypes.STRING,
    longEnd: DataTypes.STRING,
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