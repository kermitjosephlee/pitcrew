'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('technicians', [{
      ride_id: 1,
      userName: 'Bob',
      name: 'Mr. MeeFix',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('technicians', null, {})
  }
};