const express = require('express');
const dataRouter = express.Router();

const { data: dataController} = require('../../controllers');
const { auth: authController} = require('../../controllers');
const {idea : ideaController} = require('../../controllers');

//메인 페이지 정보
dataRouter.get('/usercount', authController.getUserCount);
dataRouter.get('/ideacount', ideaController.getIdeaCount);
dataRouter.get('/todayvisitor', authController.getTodayVisitor);
dataRouter.get('/totalvisitor', authController.getTotalVisitor);

//user data 정보
dataRouter.get('/:userIdx', dataController.getuserData);

module.exports = dataRouter;
