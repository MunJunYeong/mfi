const axios = require('axios');

const {anonymous: anonymousService } = require('../../service');
const {visitor : visitorService} =require('../../service');
const {user : userService} = require('../../service');
const { Op } = require('../../lib/db');
const {pagination, utils} = require('../../lib/common');

let checkEng = /[a-zA-Z]/;
let checkNum = /[0-9]/; 
let checkSpe = /[~!@#$%^&*()_+|<>?:{}]/;
let checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

const getUserCount = async(req, res) => {
    const result = await anonymousService.getUserCount();
    res.send({data : result});
}
const getTodayVisitor = async(req, res) => {
    const result = await visitorService.getTodayVisitor();
    res.send({data : result});
}
const getTotalVisitor = async(req, res) => {
    const result = await visitorService.getTotalVisitor();
    res.send({data : result});
}
const getNewsItem = async(req, res) => {
    const result = await anonymousService.getNewsItem();
    res.send({data : result});
}

// const getNewsItem = async(req, res) => {
//     const result = await anonymousService.getnews
//     res.send(httpRes.data);
// }
//회원가입
const signUP = async (req, res) => {
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
}

const sendEmail = async (req, res) => {
    const data = req.body;
    if(!data.email){
        res.send({message : 'no email'});
        return;
    }
    if(!utils.validationEmail(data.email)){
        res.send({message : 'not validate email'});
    }
    const result = await anonymousService.sendEmail(data.email);
    if(result.message === 'exist email'){
        res.send({message : 'exist email'});
        return;
    }else if(result.dataValues.idx){
        res.send({data : result.dataValues.idx});
        return;
    }else {
        res.send({message : 'fail to send email'});
        return;
    }
}
const checkEmail = async (req, res) => {
    const data = req.body;
    
    if(!data.email && !data.no){
        res.send({message : 'no data'});
        return;
    }else if(!data.no){
        res.send({message : 'no no'});
        return;
    }else if(!data.email){
        res.send({message : 'no email'});
        return;
    }
    const result = await anonymousService.checkEmail(data.email, data.no);
    if(result.data === 1){
        res.send({data : 1});
    }else {
        res.send({message : 'wrong no'});
    }
}
//find Id, Pw
const findIdSendMail = async(req, res) => {
    const data = req.body;
    // front에서 막아놨기에 비정상적인 접근으로 이메일을 쏜거임
    if(!data.email){
        res.send({message : 'wrong access'});
    }
    const result = await anonymousService.findIdSendMail(data.email);
    // console.log(result);
    res.send(result);
    // if(result === undefined || result.message === 'no data' ){
    //     res.send(result);
}
const findPwSendMail = async(req, res) => {
    const data = req.body;
    // front에서 막아놨기에 비정상적인 접근으로 이메일을 쏜거임
    if( data.id === '' || data.email === '' || data.id === null || data.email === null ){
        res.send({message : 'wrong access'}); return;
    }
    const result = await anonymousService.findPwSendMail(data.id, data.email);
    res.send(result);
    
}
const updatePw = async(req, res) => {
    const data = req.body; // data -> email, pw, id
    // front에서 막아놨기에 비정상적인 접근으로 이메일을 쏜거임
    if(data.email === '' || data.pw === '' || data.id === ''){
        res.send({message : 'wrong access'}); return;
    }
    const result = await anonymousService.updatePw(data.email, data.pw, data.id);
    console.log(result[0]);
    res.send({data : result[0]});
}

//로그인
const signIn = async (req, res) => {
    const data = req.body;

    if(!data.id || !data.pw){
        res.send({message : 'no data'});
        return;
    }
    const result = await anonymousService.signIn(data.id, data.pw);

    res.send(result);
}

//아이디 중복확인
const checkId = async (req, res) =>{
    const data = req.body;

    if(!data.id){
        res.send({ message : 'ID를 입력해주세요.'})
        return;
    }else if(checkKor.test(data.id) || !checkEng.test(data.id) || !checkNum.test(data.id)){
        res.send({message : '영어와 숫자를 사용해주세요.'});
        return;
    }else if(data.id.length <6){
        res.send({message : '6글자 이상 입력해주세요.'});
        return;
    }
    const result = await anonymousService.duplicateId(data.id);
    console.log(result);
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
}
const checkNickName = async (req, res) => {
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
}

const updateUserRole = async (req, res) => {
    const data = req.body;
  
    const result = await userService.updateRole(data.role, data.userIdx);
    if(result){
      res.send(result)
    }
}

const getUser = async (req, res)=> {
    const {page, nickName} = req.query;
            
    const {limit, offset} = pagination.getPagination(page);
        
    let where = {};
    
    where.role = {
        [Op.ne] : 'admin'
    }
    if(nickName !== undefined){
        where.nickName = {
            [Op.like] : `%${nickName}%`
        }
    }
    const data = await userService.getUser(where, limit, offset);
    const result = pagination.getPagingUserData(data, page, limit);
    res.send(result);
}




module.exports = {
    signUP,
    sendEmail,
    checkEmail,
    signIn,
    checkId,
    checkNickName,
    updateUserRole,
    getUser,
    getUserCount,
    getTotalVisitor,
    getTodayVisitor,
    findIdSendMail,
    findPwSendMail,
    updatePw,
    getNewsItem
}