'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('visitor', { 
      commentIdx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userIdx: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'userIdx',
          },
      },
      ideaIdx: {
        type: DataTypes.INTEGER,
        onDelete: "cascade",
        references: {
            model: 'idea',
            key: 'ideaIdx',
          },
      },
      comment: {
        type: DataTypes.STRING
      },
      created: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
      },
   });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('comment');
  }
};
