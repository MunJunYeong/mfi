'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', { 
      userIdx: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      id: {
          type: Sequelize.STRING
          // allowNull defaults to true
      },
      pw: {
          type: Sequelize.STRING
      },
      nickName: {
          type: Sequelize.STRING
      },
      email: {
          type: Sequelize.STRING
      },
      created: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      status: {
          type: Sequelize.STRING
      },
      role: {
          type: Sequelize.STRING
      }
     });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  }
};
