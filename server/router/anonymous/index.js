const express = require('express')
const anonymousRouter = express.Router();
const ideaPagination = require('./ideaController');

const {models, Op} = require('../../lib/db');

const jwt = require('jsonwebtoken');

let checkEng = /[a-zA-Z]/;
let checkNum = /[0-9]/; 
let checkSpe = /[~!@#$%^&*()_+|<>?:{}]/;
let checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;


//회원가입하기
anonymousRouter.post('/signUp', async (req, res) =>{
    const data = req.body;
    console.log(data);

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
    const result = await models['user'].create({
        id : data.id,
        pw : data.pw,
        nickName : data.nickName,
        email : data.email,
        role : 'normal'
    });
    res.send({data : result});
    return;
})

//로그인하기
anonymousRouter.post('/signIn', async(req,res) =>{
    const data = req.body;
    let accessToken;

    if(!data.id || !data.pw){
        res.send({message : 'no data'});
        return;
    }
    const findId = await models['user'].findOne({
        where : {
            id : data.id
        }
    });

    if(findId){
        const tokenData = {
            ...findId.toJSON()
        }
        console.log(tokenData);
        if(data.pw === tokenData.pw){
            delete tokenData.pw;
            accessToken = jwt.sign(tokenData, 'shhhhh');
        }else {
            res.send({message : 'wrong pw'})
            return;
        }
    }else {
        res.send({message : 'not exist id'});
        return;
    }
    res.send({token : accessToken});
    return;
})

//아이디 중복확인
anonymousRouter.post('/checkId', async (req, res) =>{
    const data = req.body;

    if(!data.id){
        res.send({ message : 'ID를 입력해주세요.'})
        return;
    }else if(checkKor.test(data.id) || !checkEng.test(data.id) || !checkNum.test(data.id)){
        res.send({message : '영어와 숫자를 사용해주세요.'});
        return;
    }else if(data.id.length <6){
        res.send({message : '6글자 이상 입력해주세요.'});
    }
    const result = await models['user'].findOne({
        where : {
            id : data.id
        }
    });
    if(result){
        res.send({
            value : 'false',
            message : '존재하는 ID입니다.'})
        return;
    }else {
        res.send({
            value : 'true',
            message : '사용가능한 ID입니다!'})
        return;
    }
})

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
    const result = await models['user'].findOne({
        where : {
            nickName : data.nickName
        }
    });
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
