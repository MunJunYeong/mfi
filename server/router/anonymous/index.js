const express = require('express')
const passport = require('passport');
const anonymousRouter = express.Router();
const {anonymous: anonymousController} = require('../../controllers');
const {idea : ideaController} = require('../../controllers');
const {middleware} = require('../../lib/common/index')


//회원가입하기
anonymousRouter.post('/signup', anonymousController.signUP);
anonymousRouter.post('/sendemail', anonymousController.sendEmail);
anonymousRouter.post('/checkemail', anonymousController.checkEmail);

//ID, PW 찾기
anonymousRouter.post('/findid', anonymousController.findIdSendMail);
anonymousRouter.post('/findpw', anonymousController.findPwSendMail);
anonymousRouter.put('/updatepw', anonymousController.updatePw);

//로그인하기 - 이중로그인에서 1개만 로그인
anonymousRouter.post('/signin', anonymousController.signIn);
anonymousRouter.post('/forcesignin', anonymousController.forceSignIn);

//로그아웃
anonymousRouter.put('/logout',  anonymousController.logout);

//아이디 중복확인
anonymousRouter.post('/checkid', anonymousController.checkId);
//닉네임 중복확인
anonymousRouter.post('/checknickname', anonymousController.checkNickName)

//아이디어 보기
anonymousRouter.get('/idea', ideaController.showIdea);
anonymousRouter.get('/info/idea', middleware.validateToken ,ideaController.showMyIdea);
anonymousRouter.get('/user/:userIdx/idea', ideaController.showAdminUserIdea);

//OAuth
anonymousRouter.get('/signin/naver', passport.authenticate('naver'));

module.exports = anonymousRouter;