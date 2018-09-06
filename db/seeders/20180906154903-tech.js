'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Technicians', [{
        RideId: 1,
        username: 'Danny',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        RideId: 1,
        username: 'Josh',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        RideId: 1,
        username: 'Cashmere',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        RideId: 1,
        username: 'Phoebe',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        RideId: 1,
        username: 'Rachel',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        RideId: 1,
        username: 'Joe',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Technicians', null, {})
  }
};