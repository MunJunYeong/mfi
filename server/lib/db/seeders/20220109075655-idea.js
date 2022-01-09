'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const adminTemp = await queryInterface.sequelize.query('SELECT userIdx FROM "user WHERE role=admin"')
    const admin = adminTemp[0];

    const winnerTemp = await queryInterface.sequelize.query('SELECT userIdx FROM "user WHERE role=winner"')
    const winner = winnerTemp[0];

    const normalTemp = await queryInterface.sequelize.query('SELECT userIdx FROM "user WHERE role=normal"')
    const noraml = normalTemp[0];
    await queryInterface.bulkInsert('idea', [
      {
        ideaIdx : 1,
        userIdx : admin,
        subject : '관리자가 작성한 1번 글입니다.',
        content : '관리자계정 첫 번째 작성 글',
        created : '2020-01-01 03:00:00',
      },
      {
        ideaIdx : 2,
        userIdx : admin,
        subject : '관리자가 작성한 2번 글입니다.',
        content : '관리자계정 두 번째 작성 글',
        created : '2020-01-02 03:01:00',
      },
      {
        ideaIdx : 3,
        userIdx : admin,
        subject : '관리자가 작성한 3번 글입니다.',
        content : '관리자계정 세 번째 작성 글',
        created : '2020-01-03 03:02:00',
      },
      {
        ideaIdx : 4,
        userIdx : winner,
        subject : '위너가 작성한 1 게시물',
        content : '위너 첫 번째 작성 글',
        created : '2021-01-05 12:00:00',
      },
      {
        ideaIdx : 5,
        userIdx : winner,
        subject : '위너가 작성한 2 게시물',
        content : '위너 두 번째 작성 글',
        created : '2021-01-05 12:25:00',
      },
      {
        ideaIdx : 6,
        userIdx : noraml,
        subject : '노말이 작성한 1 게시물',
        content : '위너 첫 번째 작성 글',
        created : '2021-01-07 12:00:00',
      },
      {
        ideaIdx : 7,
        userIdx : noraml,
        subject : '노말이 작성한 2 게시물',
        content : '위너 첫 번째 작성 글',
        created : '2021-01-05 12:02:00',
      },
      {
        ideaIdx : 8,
        userIdx : noraml,
        subject : '노말이 작성한 3 게시물',
        content : '위너 첫 번째 작성 글',
        created : '2021-01-05 12:10:00',
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
