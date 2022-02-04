'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('user', [
      {
        id : 'a',
        pw : 'a',
        nickName : '관리자계정',
        email : 'a@naver.com',
        created : '2020-01-01 02:00:00',
        role : 'admin'
      },
      {
        id : 'b',
        pw : 'b',
        nickName : '위너계정',
        email : 'b@naver.com',
        created : '2021-01-01 03:00:00',
        role : 'winner'
      },
      {
        id : 'c',
        pw : 'c',
        nickName : '노말계정',
        email : 'c@naver.com',
        created : '2020-01-02 03:00:00',
        role : 'normal'
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {});
  }
};
