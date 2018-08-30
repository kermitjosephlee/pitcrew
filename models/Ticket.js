"use strict";
module.exports = (sequelize, DataTypes) => {
  const ticket = sequelize.define(
    "Ticket",
    {
      rider: DataTypes.STRING,
      contact: DataTypes.STRING,
      lat: DataTypes.STRING,
      long: DataTypes.STRING,
      type: {
        type: DataTypes.ENUM,
        values: ["mechanical", "medical", "sweep"]
      },
      startTime: DataTypes.DATE,
      endTime: DataTypes.DATE,
      description: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ["active", "pending", "completed", "cancelled"]
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      timestamps: true
    }
  );
  ticket.associate = function(models) {
    ticket.belongsTo(models.Ride);
    ticket.belongsTo(models.Technician);
  };
  return ticket;
};
