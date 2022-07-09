const {anonymous: anonymousService } = require('../../service');
const {user : userService} = require('../../service');
const winston = require('../../lib/common/winston');

const {authValidation} = require('../../lib/common/validation');
const  {authValidationService} = require('../../service/validation');

//회원가입
const signUP = async (req, res) => {
    const data = req.body;

    if(!authValidation.isValidId(data.id) || !authValidation.isValidNickName(data.nickName) ||
        !authValidation.isValidPw(data.pw) || !authValidation.isValidEmail(data.email)
    )  throw new Error('WRONG_ACCESS');

    try{
        if(!await authValidationService.isDuplicatedId(data.id) || !await authValidationService.isDuplicatedEmail(data.email) || 
        !await authValidationService.isDuplicatedNickName(data.nickName))  throw new Error('WRONG_ACCESS');
    }catch(err){
        if(err.message) throw new Error(err.message);
        winston.error(`Unable to validation for duplicated data :`, err);
        throw new Error('')
    }

    try{
        const result = await anonymousService.signUp(data.id, data.pw, data.nickName, data.email, 'normal');
        //userToken 만드는 트랜잭션은 service레이어에서 동시에 실행
        res.send({data : result});
    }catch(err){
        if(err.message === 'DB_SIGNUP') throw new Error(err.message);
        if(err.message === 'WRONG_ACCESS') throw new Error(err.message);
        winston.error(`Unable to signup :`, err);
        throw new Error('UNABLE_SIGNUP');
    }
    
}

const sendEmail = async (req, res) => {
    const data = req.body;
    if(!authValidation.isValidEmail(data.email))throw new Error('WRONG_ACCESS');
    
    if(!await authValidationService.isDuplicatedEmail(data.email)) throw new Error('EXIST_EMAIL');

    try{
        const result = await anonymousService.sendEmail(data.email);
        res.send({data : result.dataValues.idx});
    }catch(err){
        if(err.message === 'EXIST_EMAIL') throw new Error(err.message);
        if(err.message === 'DB_SEND_EMAIL') throw new Error(err.message);
        winston.error(`Unable to sendEmail :`, err);
        throw new Error('UNABLE_SEND_MAIL')
    }
}
const checkEmail = async (req, res) => {
    const data = req.body;
    if(!authValidation.isValidEmail(data.email) || !data.no) throw new Error('WRONG_ACCESS');

    try{
        await anonymousService.checkEmail(data.email, data.no);
        res.send({data : 1});
    }catch(err){
        if(err.message === 'DB_FIND_AUTH_NO')throw new Error(err.message);
        if(err.message === 'NOT_FOUND_EMAIL')throw new Error(err.message);
        if(err.message === 'DB_CHECK_EMAIL')throw new Error(err.message);
        if(err.message ==='NOT_CORRECT_AUTHNO')throw new Error(err.message);
        winston.error(`Unable to checkEmail :`, err);
        throw new Error('UNABLE_CHECK_MAIL');
    }
}
//find Id, Pw
const findIdSendMail = async(req, res) => {
    const data = req.body;
    if(!authValidation.isValidEmail(data.email))throw new Error('WRONG_ACCESS');
    try{
        const result = await anonymousService.findIdSendMail(data.email);
        res.send(result);
    }catch(err){
        if(err.message === 'DB_FIND_USER_FOR_FINDID')throw new Error(err.message);
        if(err.message === 'NOT_FOUND')throw new Error(err.message);
        if(err.message === 'DB_FIND_ID_SEND_MAIL')throw new Error(err.message);
        winston.error(`Unable to sendMail for findId :`, err);
        throw new Error('UNABLE_FIND_ID_SEND_MAIL');
    }
    
}
const findPwSendMail = async(req, res) => {
    const data = req.body;
    if(!authValidation.isValidId(data.id) || !authValidation.isValidEmail(data.email)) throw new Error('WRONG_ACCESS');

    if(await authValidationService.isDuplicatedId(data.id) || await authValidationService.isDuplicatedEmail(data.email)) throw new Error('NOT_FOUND');

    try{
        const result = await anonymousService.findPwSendMail(data.id, data.email);
        res.send(result);
    }catch(err){
        if(err.message === 'NOT_FOUND') throw new Error(err.message);
        if(err.message=== 'DB_FIND_PW_SEND_MAIL')throw new Error(err.message);
        winston.error(`Unable to sendMail for findPw :`, err);
        throw new Error('UNABLE_FIND_PW_SEND_MAIL');
    }
}
const updatePw = async(req, res) => {
    const data = req.body; // data -> email, pw, id
    if(!authValidation.isValidId(data.id) || !authValidation.isValidEmail(data.email)||
    !authValidation.isValidPw(data.pw)) throw new Error('WRONG_ACCESS');

    try{
        const result = await anonymousService.updatePw(data.email, data.pw, data.id);
        res.send({data : result[0]});
    }catch(err){
        if(err.message === 'DB_UPDATE_PW')throw new Error(err.message);
        winston.error(`Unable to updatePw :`, err);
        throw new Error('UNABLE_UPDATE_PW');
    }
}

//로그인
const signIn = async (req, res) => {
    const data = req.body;
    
    if(!authValidation.isValidId(data.id) || !authValidation.isValidPw(data.pw)) throw new Error('WRONG_ACCESS');

    try{
        const result = await anonymousService.signIn(data.id, data.pw);
        res.send(result);
    }catch(err){
        if(err.message === 'DB_FIND_ID_SIGNIN')throw new Error(err.message);
        if(err.message === 'ISLOGIN')throw new Error(err.message);
        if(err.message === 'DB_SIGNIN')throw new Error(err.message);
        if(err.message === 'WRONG_PW')throw new Error(err.message);
        if(err.message === 'WRONG_ID')throw new Error(err.message);
        winston.error(`Unable to signIn :`, err);
        throw new Error('UNABLE_SIGNIN');
    }
}

// flow : isLogin을 받았을 경우 -> 1. (id, pw)로 userIdx를 찾는다. 
// 2. userToken에 저장되어져 있는 토큰을 제거. 3. 로그인 시도
const forceSignIn= async(req, res) => {
    const data = req.body;

    if(!authValidation.isValidId(data.id) || !authValidation.isValidPw(data.pw)) throw new Error('WRONG_ACCESS');
    let userIdx;
    try{
        userIdx = await anonymousService.findIdUser(data.id, data.pw);
    }catch(err){
        if(err.message === 'DB_FIND_USER_PARA_IDPW')throw new Error(err.message);
        winston.error(`Unable to findIdUser :`, err);
        throw new Error('UNABLE_FIND_ID_USER');
    }
    try{
        await userService.logout(userIdx);
    }catch(err){
        if(err.message === 'DB_LOGOUT') throw new Error(err.message);
        winston.error(`Unable to logout :`, err);
        throw new Error('UNABLE_LOGOUT');
    }
    try{
        //userIdx에 해당하는 토큰을 제거 후 로그인 시도
        const result = await anonymousService.signIn(data.id, data.pw);
        res.send(result);
    }catch(err){
        if(err.message === 'DB_SIGNIN')throw new Error(err.message);
        if(err.message === 'WRONG_PW')throw new Error(err.message);
        if(err.message === 'WRONG_ID')throw new Error(err.message);
        winston.error(`Unable to forcesignIn :`, err);
        throw new Error('UNABLE_FORCE_SIGNIN');
    }
}
const logout = async(req, res) => {
    const data = req.body;

    try{
        const result = await userService.logout(data.userIdx);
        res.send(result)
    }catch(err){
        if(err.message === 'DB_LOGOUT')throw new Error(err.message);
        winston.error(`Unable to logout :`, err);
        throw new Error('UNABLE_LOGOUT');
    }
}

//아이디 중복확인
const checkId = async (req, res) =>{
    const data = req.body;
    if(!authValidation.isValidId(data.id)) throw new Error('WRONG_ACCESS');

    try{
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
    }catch(err){
        if(err.message ==='DB_DUPLICATE_ID')throw new Error(err.message);
        winston.error(`Unable to checkId(duplicate) :`, err);
        throw new Error('UNABLE_CHECKID');
    }
    
}
const checkNickName = async (req, res) => {
    const data = req.body;
    
    if(!authValidation.isValidNickName(data.nickName))throw new Error('WRONG_ACCESS');

    try{
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
    }catch(err){
        if(err.message ==='DB_DUPLICATE_NICKNAME')throw new Error(err.message);
        winston.error(`Unable to checkNickName(duplicate) :`, err);
        throw new Error('UNABLE_CHECKNICKNAME');
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