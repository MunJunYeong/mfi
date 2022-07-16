const winston = require('../../lib/common/winston');
const {authValidation} = require('../../lib/common/validation');
const {anonymous: anonymousService } = require('../../service');
const {user : userService} = require('../../service');
//아이디/ 닉네임 중복확인때문에 바로 가지고 와서 사용(service layer 불필요)
const {anonymous : anonymousRepo} = require('../../repository');

//회원가입
const signUP = async (req, res) => {
    const data = req.body;

    if(!authValidation.isValidId(data.id) || !authValidation.isValidNickName(data.nickName) ||
        !authValidation.isValidPw(data.pw) || !authValidation.isValidEmail(data.email)
    )  throw new Error('WRONG_ACCESS');

    let result;
    try{
        result = await anonymousService.signUp(data.id, data.pw, data.nickName, data.email, 'normal');
        //userToken 만드는 트랜잭션은 service레이어에서 동시에 실행
    }catch(err){
        if(err.message) throw new Error(err.message);
        winston.error(`Controller signUP Error :`, err);
        throw new Error('CONTROLLER_SIGNUP');
    }

    res.send({data : result});
}

const sendEmail = async (req, res) => {
    const data = req.body;
    if(!authValidation.isValidEmail(data.email))throw new Error('WRONG_ACCESS');
    let result;
    try{
        result = await anonymousService.sendEmail(data.email);
    }catch(err){
        if(err.message) throw new Error(err.message);
        winston.error(`Controller sendEmail Error :`, err);
        throw new Error('CONTROLLER_SEND_EMAIL');
    }

    res.send({data : result.idx});
}
const checkEmail = async (req, res) => {
    const data = req.body;
    if(!authValidation.isValidEmail(data.email) || !data.no) throw new Error('WRONG_ACCESS');

    try{
        await anonymousService.checkEmail(data.email, data.no);
    }catch(err){
        if(err.message) throw new Error(err.message);
        winston.error(`Controller checkEmail Error :`, err);
        throw new Error('CONTROLLER_CHECK_EMAIL');
    }

    res.send({data : 1});
}
//find Id, Pw
const findIdSendMail = async(req, res) => {
    const data = req.body;
    if(!authValidation.isValidEmail(data.email))throw new Error('WRONG_ACCESS');
    let result;
    try{
        result = await anonymousService.findIdSendMail(data.email);
    }catch(err){
        if(err.message) throw new Error(err.message);
        winston.error(`Controller findIdSendMail Error :`, err);
        throw new Error('CONTROLLER_FIND_ID_SEND_EMAIL');
    }

    res.send(result);
}
const findPwSendMail = async(req, res) => {
    const data = req.body;
    if(!authValidation.isValidId(data.id) || !authValidation.isValidEmail(data.email)) throw new Error('WRONG_ACCESS');
    let result;
    try{
        result = await anonymousService.findPwSendMail(data.id, data.email);
    }catch(err){
        if(err.message) throw new Error(err.message);
        winston.error(`Controller findPwSendMail Error :`, err);
        throw new Error('CONTROLLER_FIND_PW_SEND_EMAIL');
    }

    res.send(result);
}
const updatePw = async(req, res) => {
    const data = req.body; // data -> email, pw, id
    if(!authValidation.isValidId(data.id) || !authValidation.isValidEmail(data.email)||
    !authValidation.isValidPw(data.pw)) throw new Error('WRONG_ACCESS');
    let result;
    try{
        result = await anonymousService.updatePw(data.email, data.pw, data.id);
    }catch(err){
        if(err.message) throw new Error(err.message);
        winston.error(`Controller updatePw Error :`, err);
        throw new Error('CONTROLLER_UPDATE_PW');
    }
    res.send({data : result[0]});
} 

//로그인
const signIn = async (req, res) => {
    const data = req.body;
    
    if(!authValidation.isValidId(data.id) || !authValidation.isValidPw(data.pw)) throw new Error('WRONG_ACCESS');
    let result;
    try{
        result = await anonymousService.signIn(data.id, data.pw);
    }catch(err){
        if(err.message) throw new Error(err.message);
        winston.error(`Controller signIn Error :`, err);
        throw new Error('CONTROLLER_SIGNIN');
    }

    res.send(result);
}

// flow : isLogin을 받았을 경우 -> 1. (id, pw)로 userIdx를 찾는다. 
// 2. userToken에 저장되어져 있는 토큰을 제거. 3. 로그인 시도
const forceSignIn= async(req, res) => {
    const data = req.body;

    if(!authValidation.isValidId(data.id) || !authValidation.isValidPw(data.pw)) throw new Error('WRONG_ACCESS');
    let result;
    try{
        result = await anonymousService.forceSignIn(data.id, data.pw);
    }catch(err){
        if(err.message) throw new Error(err.message);
        winston.error(`Controller forceSignIn Error :`, err);
        throw new Error('CONTROLLER_FORCE_SIGNIN');
    }

    res.send(result);
}
const logout = async(req, res) => {
    const data = req.body;
    let result;
    try{
        result = await userService.logout(data.userIdx);
    }catch(err){
        if(err.message) throw new Error(err.message);
        winston.error(`Controller logout Error :`, err);
        throw new Error('CONTROLLER_LOGOUT');
    }
    
    res.send(result);
}

//아이디 중복확인
const checkId = async (req, res) =>{
    const data = req.body;
    if(!authValidation.isValidId(data.id)) throw new Error('WRONG_ACCESS');
    let result;
    try{
        result = await anonymousRepo.findUserById(data.id);
    }catch(err){
        if(err.message) throw new Error(err.message);
        winston.error(`Controller checkId Error :`, err);
        throw new Error('CONTROLLER_CHECK_ID');
    }
    if(result){
        res.send({
            value : 'false',
            message : 'exist id'})
        return;
    }else {
        res.send({
            value : 'true',
            message : 'usable id'})
        return;
    }
}
const checkNickName = async (req, res) => {
    const data = req.body;
    
    if(!authValidation.isValidNickName(data.nickName))throw new Error('WRONG_ACCESS');
    let result;
    try{
        result = await anonymousRepo.findUserByNickName(data.nickName);
    }catch(err){
        if(err.message) throw new Error(err.message);
        winston.error(`Controller checkNickName Error :`, err);
        throw new Error('CONTROLLER_CHECK_NICKNAME');
    }
    if(result){
        res.send({
            value : 'false',
            message : 'exist nickName'})
        return;
    }else {
        res.send({
            value : 'true',
            message : 'usable nickName'})
        return;
    }
}

module.exports = {
    signUP,
    sendEmail,
    checkEmail,
    signIn,
    forceSignIn,
    checkId,
    checkNickName,
    findIdSendMail,
    findPwSendMail,
    updatePw,
    logout,
}