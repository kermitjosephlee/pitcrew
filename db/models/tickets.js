'use strict';
module.exports = (sequelize, DataTypes) => {
  const tickets = sequelize.define('tickets', {
    rider: DataTypes.STRING,
    contact: DataTypes.STRING,
    location: DataTypes.GEOGRAPHY,
    type: {
      type: Sequelize.ENUM,
      values: ['mechanical', 'medical', 'sweep']
    },
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    description: DataTypes.STRING,
    status: {
      type: Sequelize.ENUM,
      values: ['active', 'pending', 'completed', 'cancelled']
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }, {
    timestamps: true
  });
  tickets.associate = function (models) {
    tickets.belongsTo(rides, {
      foreignKey: 'ride_id'
    })
    tickets.belongsTo(technicians, {
      foreignKey: 'technician_id'
    });
  };
  return tickets
};