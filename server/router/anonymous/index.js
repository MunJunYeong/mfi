const express = require('express')
const anonymousRouter = express.Router();
// const ideaPagination = require('../../controllers/idea');
const { auth: authController} = require('../../controllers');
const {idea : ideaController} = require('../../controllers');
const {middleware} = require('../../lib/common/index')

//메인 페이지 정보
anonymousRouter.get('/usercount', authController.getUserCount);
anonymousRouter.get('/ideacount', ideaController.getIdeaCount);
anonymousRouter.get('/todayvisitor', authController.getTodayVisitor);
anonymousRouter.get('/totalvisitor', authController.getTotalVisitor);

//뉴스 페이지 정보
anonymousRouter.get('/news', authController.getNewsItem);

//회원가입하기
anonymousRouter.post('/signup', authController.signUP);
anonymousRouter.post('/sendemail', authController.sendEmail);
anonymousRouter.post('/checkemail', authController.checkEmail);

//ID, PW 찾기
anonymousRouter.post('/findid', authController.findIdSendMail);
anonymousRouter.post('/findpw', authController.findPwSendMail);
anonymousRouter.put('/updatepw', authController.updatePw);

//로그인하기
anonymousRouter.post('/signin', authController.signIn);

//아이디 중복확인
anonymousRouter.post('/checkid', authController.checkId);
//닉네임 중복확인
anonymousRouter.post('/checknickname', authController.checkNickName)

//아이디어 보기
anonymousRouter.get('/idea', ideaController.showIdea);
anonymousRouter.get('/info/idea', middleware.validateToken ,ideaController.showMyIdea);
anonymousRouter.get('/user/:userIdx/idea', ideaController.showAdminUserIdea);

module.exports = anonymousRouter;
