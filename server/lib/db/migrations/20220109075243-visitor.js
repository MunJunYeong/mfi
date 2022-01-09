'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('visitor', { 
      name : {
           type : Sequelize.STRING,
       },
       totalCount : {
           type : Sequelize.INTEGER,
       },
       todayCount : {
           type : Sequelize.INTEGER,
       },
       date : {
           type : Sequelize.STRING
       }
     });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('visitor');
  }
};
