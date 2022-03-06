'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('news', {
      idx: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      tit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subcontent: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      oid: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      aid: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ohnm: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dt: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('totalVisitor');
  }
};