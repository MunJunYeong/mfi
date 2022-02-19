'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('visitor', {
      ip : {
        type : Sequelize.STRING,
      },
      total : {
           type : Sequelize.INTEGER,
      },
      date : {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('visitor');
  }
};
