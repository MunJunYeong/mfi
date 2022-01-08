'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const query = await queryInterface.sequelize.query('SELECT * FROM "user"')
    const result = query[0]
    console.log(result[0]);
    await queryInterface.bulkInsert('usersdfddddd', [
      {
      name: 'John Doe',
      totalCount: 2,
      todayCount: 10,
      date: '1111'
     },
     {
      name: 'John Doe',
      totalCount: 2,
      todayCount: 'adfdasfasdf',
      date: '1111'
     }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
