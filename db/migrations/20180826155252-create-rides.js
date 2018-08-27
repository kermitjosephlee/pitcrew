'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rides', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dispatcher_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'dispatchers',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATEONLY
      },
      timeStart: {
        type: Sequelize.TIME
      },
      timeEnd: {
        type: Sequelize.TIME
      },
      latStart: {
        type: Sequelize.STRING
      },
      longStart: {
        type: Sequelize.STRING
      },
      latEnd: {
        type: Sequelize.STRING
      },
      longEnd: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('rides')
  }
};