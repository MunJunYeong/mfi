const express = require('express')
const anonymousRouter = express.Router();
// const ideaPagination = require('../../controllers/idea');
const {auth: authController} = require('../../controllers');
const {idea : ideaController} = require('../../controllers');
const {middleware} = require('../../lib/common/index')

//회원가입하기
anonymousRouter.post('/signup', authController.signUP);
anonymousRouter.post('/sendemail', authController.sendEmail);
anonymousRouter.post('/checkemail', authController.checkEmail);

//ID, PW 찾기
anonymousRouter.post('/findid', authController.findIdSendMail);
anonymousRouter.post('/findpw', authController.findPwSendMail);
anonymousRouter.put('/updatepw', authController.updatePw);

//로그인하기 - 이중로그인에서 1개만 로그인
anonymousRouter.post('/signin', authController.signIn);
anonymousRouter.post('/forcesignin', authController.forcesignIn);

//로그아웃
anonymousRouter.put('/logout',  authController.logout);

//아이디 중복확인
anonymousRouter.post('/checkid', authController.checkId);
//닉네임 중복확인
anonymousRouter.post('/checknickname', authController.checkNickName)

//아이디어 보기
anonymousRouter.get('/idea', ideaController.showIdea);
anonymousRouter.get('/info/idea', middleware.validateToken ,ideaController.showMyIdea);
anonymousRouter.get('/user/:userIdx/idea', ideaController.showAdminUserIdea);

module.exports = anonymousRouter;
