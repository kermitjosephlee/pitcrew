'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('rides', [{
      dispatcher_id: 1,
      name: 'John Doe',
      date: 'Sun Aug 26 2018',
      raceStart: '18:00:00 GMT+0000 (UTC)',
      raceEnd: '20:00:00 GMT+0000 (UTC)',
      locationStart: '46 Spadina Avenue, Toronto',
      locationEnd: '1 York Street, Toronto',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rides', null, {})
  }
};