'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('visitor', {
      idx: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      ip : {
        type : Sequelize.STRING,
        allowNull: false,
      },
      date : {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('visitor');
  }
};
