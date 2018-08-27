'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tickets', [{
      ride_id: 1,
      technician_id: 1,
      rider: 'Jerry',
      contact: '555-555-5555',
      lat: '43.6532',
      long: '-79.3832',
      type: 'mechanical',
      startTime: 'Sun Aug 26 2018 18:37:58',
      endTime: 'Sun Aug 26 2018 18:50:12',
      description: 'i have a flat tire',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tickets', null, {});
  }
}