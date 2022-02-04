'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('comment', [
      {
        userIdx : 2,
        ideaIdx : 1,
        comment : '2번위너회원이 1번 관리자 게시물에 댓글 작성',
        created : '2020-01-10 03:01:00',
      },
      {
        userIdx : 3,
        ideaIdx : 1,
        comment : '3번 노말회원이 1번 관리자 게시물에 댓글 작성',
        created : '2020-01-10 04:01:00',
      },
      {
        
        userIdx : 1,
        ideaIdx : 2,
        comment : '1번 관리자회원이 2번 위너 게시물에 댓글 작성',
        created : '2020-01-12 03:01:00',
      },
      {
        
        userIdx : 2,
        ideaIdx : 3,
        comment : '2번 위너회원이 3번 노말회원 게시물에 댓글 작성',
        created : '2020-01-13 03:01:00',
      },
    ])
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
