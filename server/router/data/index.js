const express = require('express');
const dataRouter = express.Router();
const {middleware} = require('../../lib/common/index')
const { data: dataController} = require('../../controllers');
const { auth: authController} = require('../../controllers');
const {idea : ideaController} = require('../../controllers');

//ip 등록
dataRouter.post('/ip', authController.createIp);
//메인 페이지 정보
dataRouter.get('/usercount', authController.getUserCount);
dataRouter.get('/ideacount', ideaController.getIdeaCount);
dataRouter.get('/todayvisitor', authController.getTodayVisitor);
dataRouter.get('/totalvisitor', authController.getTotalVisitor);

//뉴스 페이지 정보
dataRouter.get('/news', authController.getNewsItem);

//user data 정보
dataRouter.get('/:userIdx', middleware.validateToken, dataController.getuserData);

module.exports = dataRouter;
