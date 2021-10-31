const express = require('express')
const anonymousRouter = express.Router();
const ideaPagination = require('../../controllers/idea');
const {anonymous : anonymousService} = require('../../service/index');
const { auth: authController} = require('../../controllers');


let checkEng = /[a-zA-Z]/;
let checkNum = /[0-9]/; 
let checkSpe = /[~!@#$%^&*()_+|<>?:{}]/;
let checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

//회원가입하기
anonymousRouter.post('/signUp', async (req, res) =>{
    const data = req.body;

    if(!data.id || !data.pw || !data.nickName || !data.email){
        res.send({ message : 'no data'});
        return;
    }else if(data.pw.length <=5){
        res.send({ message : '최소 6글자 이상 만들어주세요.'});
        return;
    }else if(!checkEng.test(data.pw) || !checkNum.test(data.pw) || !checkSpe.test(data.pw)){
        res.send({ message : '영어, 숫자, 특수기호를 모두 사용해주세요.'});
        return;
    }

    const result = await anonymousService.signUp(data.id, data.pw, data.nickName, data.email, 'normal');
    res.send({data : result});
    return;
})

//로그인하기
anonymousRouter.post('/signIn', async(req,res) =>{
    const data = req.body;
    

    if(!data.id || !data.pw){
        res.send({message : 'no data'});
        return;
    }
    const result = await anonymousService.signIn(data.id, data.pw);

    res.send(result);
})

//아이디 중복확인
anonymousRouter.post('/checkId', authController.checkId);

//닉네임 중복확인
anonymousRouter.post('/checkNickName', async (req, res) =>{
    const data = req.body;

    if(!data.nickName){
        res.send({ message : '닉네임을 입력해주세요.'})
        return;
    }else if(data.nickName <3){
        res.send({ message : '3글자 이상 입력해주세요'})
        return;
    }
    const result = await anonymousService.duplicateNickName(data.nickName);
    if(result){
        res.send({
            value : 'false',
            message : '존재하는 닉네임입니다.'})
        return;
    }else {
        res.send({
            value : 'true',
            message : '사용가능한 닉네임입니다!'})
        return;
    }
})

//아이디어 보기
anonymousRouter.get('/idea', ideaPagination.findAll);

anonymousRouter.get('/info/idea', ideaPagination.findAll);



module.exports = anonymousRouter;
