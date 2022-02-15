'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('visitor', { 
       totalCount : {
           type : Sequelize.INTEGER,
       },
       todayCount : {
           type : Sequelize.INTEGER,
       },
     });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('visitor');
  }
};
