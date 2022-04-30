const express = require('express');
const statisticsRouter = express.Router();

const { statistics : statisticsController} = require('../../controllers');

//ip 등록
statisticsRouter.post('/ip', statisticsController.createIp);
//메인 페이지 정보
statisticsRouter.get('/usercount', statisticsController.getUserCount);
statisticsRouter.get('/ideacount', statisticsController.getIdeaCount);
statisticsRouter.get('/todayvisitor', statisticsController.getTodayVisitor);
statisticsRouter.get('/totalvisitor', statisticsController.getTotalVisitor);

//뉴스 페이지 정보
statisticsRouter.get('/news', statisticsController.getNewsItem);

module.exports = statisticsRouter;
