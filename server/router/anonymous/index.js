const express = require('express')
const anonymousRouter = express.Router();
// const ideaPagination = require('../../controllers/idea');
const { auth: authController} = require('../../controllers');
const {idea : ideaController} = require('../../controllers');


//회원가입하기
anonymousRouter.post('/signUp', authController.signUP);

//로그인하기
anonymousRouter.post('/signIn', authController.signIn);

//아이디 중복확인
anonymousRouter.post('/checkId', authController.checkId);
//닉네임 중복확인
anonymousRouter.post('/checkNickName', authController.checkNickName)

//아이디어 보기
anonymousRouter.get('/idea', ideaController.showIdea);

anonymousRouter.get('/info/idea', ideaController.showMyIdea);



module.exports = anonymousRouter;
