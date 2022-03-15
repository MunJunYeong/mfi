// const axios = require('axios');

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

//회원가입
const signUP = async (req, res) => {
    const data = req.body;

    if(!data.id || !data.pw || !data.nickName || !data.email){
        throw new Error('no data');
    }else if(data.pw.length <=5){
        throw new Error('최소 6글자 이상 만들어주세요.');
    }else if(!checkEng.test(data.pw) || !checkNum.test(data.pw) || !checkSpe.test(data.pw)){
        throw new Error('영어, 숫자, 특수기호를 모두 사용해주세요.');
    }

    try{
        const result = await anonymousService.signUp(data.id, data.pw, data.nickName, data.email, 'normal');
        res.send({data : result});
    }catch(err){
        throw new Error('fail signup');
    }
    
}

const sendEmail = async (req, res) => {
    const data = req.body;
    if(!data.email){
        throw new Error('no email');
    }
    if(!utils.validationEmail(data.email)){
        throw new Error('not validate email');
    }
    try{
        const result = await anonymousService.sendEmail(data.email);
        res.send({data : result.dataValues.idx});
    }catch(err){
        if(err.message == 'exist email'){
            throw new Error(err.message);
        }else {
            throw new Error('fail sendEmail')
        }
    }
}
const checkEmail = async (req, res) => {
    const data = req.body;
    
    if(!data.email && !data.no){
        throw new Error('no data');
    }else if(!data.no){
        throw new Error('no no');
    }else if(!data.email){
        throw new Error('no email');
    }
    try{
        await anonymousService.checkEmail(data.email, data.no);
        res.send({data : 1});
    }catch(err){
        if(err.message === 'wrong no'){
            throw new error('wrong no');
        }else {
            throw new Error('fail to send');
        }
    }
}
//find Id, Pw
const findIdSendMail = async(req, res) => {
    const data = req.body;
    // front에서 막아놨기에 비정상적인 접근으로 이메일을 쏜거임
    if(!data.email){
        throw new Error('wrong access');
    }
    try{
        const result = await anonymousService.findIdSendMail(data.email);
        res.send(result);
    }catch(err){
        throw new Error(err);
    }
    
}
const findPwSendMail = async(req, res) => {
    const data = req.body;
    // front에서 막아놨기에 비정상적인 접근으로 이메일을 쏜거임
    if( data.id === '' || data.email === '' || data.id === null || data.email === null ){
        throw new Error('wrong access');
    }
    try{
        const result = await anonymousService.findPwSendMail(data.id, data.email);
        res.send(result);
    }catch(err){
        throw new Error(err);
    }
    
    
}
const updatePw = async(req, res) => {
    const data = req.body; // data -> email, pw, id
    // front에서 막아놨기에 비정상적인 접근으로 이메일을 쏜거임
    if(data.email === '' || data.pw === '' || data.id === ''){
        throw new Error('wrong access');
    }
    try{
        const result = await anonymousService.updatePw(data.email, data.pw, data.id);
        res.send({data : result[0]});
    }catch(err){
        throw new Error(err);
    }
}

//로그인
const signIn = async (req, res) => {
    const data = req.body;

    if(!data.id || !data.pw){
        throw new Error('no data');
    }
    try{
        const result = await anonymousService.signIn(data.id, data.pw);
        res.send(result);
    }catch(err){
        throw new Error(err);
    }
    
}

//아이디 중복확인
const checkId = async (req, res) =>{
    const data = req.body;

    if(!data.id){
        throw new Error('ID를 입력해주세요.');
    }else if(checkKor.test(data.id) || !checkEng.test(data.id) || !checkNum.test(data.id)){
        throw new Error('영어와 숫자를 사용해주세요.');
    }else if(data.id.length <6){
        throw new Error('6글자 이상 입력해주세요.');
    }
    const result = await anonymousService.duplicateId(data.id);
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
    
    if(data.nickName <3){
        throw new Error('3글자 이상 입력해주세요');
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
  
    try{
        const result = await userService.updateRole(data.role, data.userIdx);
        res.send(result)
    }catch(err){
        throw new Error(err);
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

    try{
        const data = await userService.getUser(where, limit, offset);
        const result = pagination.getPagingUserData(data, page, limit);
        res.send(result);
    }catch(err){
        throw new Error(err);
    }

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