'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('rides', [{
      dispatcher_id: 1,
      name: 'John Doe',
      date: 'Sun Aug 26 2018',
      timeStart: '18:00:00',
      timeEnd: '20:00:00',
      latStart: '44.6532',
      longStart: '-79.3832',
      latEnd: '40.6532',
      longEnd: '-80.3832',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rides', null, {})
  }
};

/* locationStart: {
  type: 'Point',
  coordinates: [44.6532, -79.3832]
},
locationEnd: {
  type: 'Point',
  coordinates: [40.6532, -79.3832]
}, */