'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tickets', [{
        RideId: 1,
        TechnicianId: 1,
        rider: 'Jerry',
        contact: '416-121-4162',
        lat: '43.7532',
        lng: '-79.3832',
        type: 'mechanical',
        startTime: 'Sun Aug 26 2018 19:37:58',
        description: 'i have a flat tire',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        RideId: 1,
        TechnicianId: 2,
        rider: 'Aaron',
        contact: '647-555-1212',
        lat: '43.6532',
        lng: '-79.4832',
        type: 'mechanical',
        startTime: 'Sun Aug 26 2018 18:57:58',
        description: 'got a bent rim',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        RideId: 1,
        TechnicianId: 3,
        rider: 'Bethany',
        contact: '416-555-1212',
        lat: '43.8532',
        lng: '-79.5832',
        type: 'medical',
        startTime: 'Sun Aug 26 2018 18:07:58',
        description: 'fell down and scrape my knee',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        RideId: 1,
        TechnicianId: 4,
        rider: 'Chris',
        contact: '453-784-2705',
        lat: '43.9532',
        lng: '-79.1832',
        type: 'sweep',
        startTime: 'Sun Aug 26 2018 19:30:58',
        description: 'take me home, im tired',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        RideId: 1,
        TechnicianId: 5,
        rider: 'Dave',
        contact: '416-905-6690',
        lat: '43.4532',
        lng: '-79.9832',
        type: 'sweep',
        startTime: 'Sun Aug 26 2018 18:27:58',
        description: 'need a ride back',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        RideId: 1,
        TechnicianId: 6,
        rider: 'Efron',
        contact: '647-162-3813',
        lat: '44.6532',
        lng: '-79.3832',
        type: 'medical',
        startTime: 'Sun Aug 26 2018 20:37:58',
        description: 'got a nose bleed',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        RideId: 1,
        TechnicianId: 7,
        rider: 'Gerry',
        contact: '416-777-8888',
        lat: '43.6532',
        lng: '-78.3832',
        type: 'mechanical',
        startTime: 'Sun Aug 26 2018 18:17:58',
        description: 'need my tires pumped',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        RideId: 1,
        rider: 'Taimou',
        contact: '647-013-8152',
        lat: '43.6532',
        lng: '-80.3832',
        type: 'sweep',
        startTime: 'Sun Aug 26 2018 20:37:58',
        description: 'take me home, country road',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        RideId: 1,
        rider: 'Stanley',
        contact: '416-612-2613',
        lat: '44.6532',
        lng: '-80.3832',
        type: 'mechanical',
        startTime: 'Sun Aug 26 2018 17:37:58',
        description: 'ride so hard my wheel burnt out',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        RideId: 1,
        rider: 'Jeff',
        contact: '905-412-2567',
        lat: '43.5320',
        lng: '-80.3832',
        type: 'mechanical',
        startTime: 'Sun Aug 26 2018 18:00:58',
        description: 'i have loose screws',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        RideId: 1,
        rider: 'Selena',
        contact: '647-252-2962',
        lat: '43.6532',
        lng: '-78.3832',
        type: 'medical',
        startTime: 'Sun Aug 26 2018 18:31:58',
        description: 'i have a boo boo',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tickets', null, {});
  }
}