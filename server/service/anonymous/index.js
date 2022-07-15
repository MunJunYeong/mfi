const {mailer} = require('../../lib/common')
const winston = require('../../lib/common/winston');
const jwtUtils = require('../../lib/common/jwt');

const {anonymous : anonymousRepo} = require('../../repository');
const {user : userRepo} = require('../../repository');

const signUp = async (id, pw, nickName, email, role) => {
    let duplicatedId;
    let duplicatedNickName;
    let duplicatedEmail;
    try{
        await anonymousRepo.findUserById(id) === null ? duplicatedId = true : duplicatedId = false;
        await anonymousRepo.findUserByNickName(nickName) === null ? duplicatedNickName = true : duplicatedNickName = false;;
        await anonymousRepo.findUserByEmail(email) === null ? duplicatedEmail = true : duplicatedEmail = false;
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.error(`Service validation signUp :`, err);
        throw new Error('SERVICE_VALIDATION_SIGNUP');
    }
    if(!duplicatedId || !duplicatedNickName || !duplicatedEmail){
        throw new Error('WRONG_ACCESS');
    }

    try{
        //이 부분 트랜잭션이 일어나는데 중간에 해주어야하는지
        const signUpData = await anonymousRepo.signUp(id, pw, nickName, email, role);
        // if(!signUpData) throw new Error('')
        const res = await anonymousRepo.makeUserToken(signUpData.userIdx);
        // if(!res) throw Error('');
        return res;
    }catch(err){
        if(err.message) throw new Error(err.message);
        winston.error(`Service signUp :`, err);
        throw new Error('SERVICE_SIGNUP');
    }
}

const signIn = async (id, pw) => {
    let findId;
    // 1. 아이디가 존재하는지 확인한다.
    try{
        findId = await anonymousRepo.findUserById(id);
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.error(`Service findUserById Error :`, err);
        throw new Error('SERVICE_FIND_USER_BY_ID');
    }
    if(findId === null) throw new Error('WRONG_ID');
    const idData = {
        ...findId.toJSON()
    }
    // 2. 비밀번호가 일치하는지 확인한다.
    if(pw !== idData.pw) throw new Error('WRONG_PW');
    // 3. userToken Table에 token이 저장되어져 있는지 확인한다
    let isLogin;
    const tempUserToken = await anonymousRepo.haveUserToken(idData.userIdx);
    tempUserToken.token === '' ? isLogin = true : isLogin = false;
    if(!isLogin) throw new Error('ISLOGIN');
    try{
        delete idData.pw; // data에서 pw제거
        const accessToken  = jwtUtils.sign(idData);
        const refreshToken = jwtUtils.refresh();
        await anonymousRepo.saveUserToken(idData.userIdx, accessToken);
        return {token : accessToken, refreshToken : refreshToken};
    }catch(err){
        winston.error(`Service signIn Error :`, err);
        throw new Error('SERVICE_SIGNIN');
    }
}

const sendEmail = async (email) => {
    let duplicatedEmail;
    try{
        await anonymousRepo.findUserByEmail(email) === null ? duplicatedEmail = true : duplicatedEmail = false;
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.error(`Service findUserByEmail Error :`, err);
        throw new Error('SERVICE_FIND_USER_BY_EMAIL');
    }
    if(!duplicatedEmail) throw new Error('EXIST_EMAIL');
    const emailNo = mailer.makeEmailNo(6); // 6자리 인증번호
    let res;
    try{
        res = await anonymousRepo.saveEmailAuthentication(email, emailNo);
        // send email method
        mailer.sendEmail(email, emailNo);
        return res;
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.error(`Service sendEmail Error :`, err);
        throw new Error('SERVICE_SEND_EMAIL');
    }
}

const checkEmail = async(email, no) => {
    //예의치 못하게 2개가 생기는 경우를 방지하고자 findOne이 아닌 findAll 사용-> 가장 최근 인증번호
    let authNo;
    try{
        authNo = await anonymousRepo.findAuthNoByEmail(email);
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.error(`Service findAuthNoByEmail Error :`, err);
        throw new Error('SERVICE_FIND_AUTH_NO_BY_EMAIL');
    }
    
    if(authNo.length === 0 || authNo[0] === undefined)throw new Error('NOT_FOUND_EMAIL');
    if(authNo[0].no !== no) throw new Error('NOT_CORRECT_AUTHNO');
    try{
        const res = await anonymousRepo.deleteAuthNo(email);
        return res;
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.error(`Service checkEmail Error :`, err);
        throw new Error('SERVICE_CHECK_EMAIL');
    }
}

const findIdSendMail = async(email) => {
    //exclude 차이로 독자적인 findUser 필요
    let userData;
    try{
        userData = await anonymousRepo.findUserByEmail(email);
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.error(`Service findUserByEmail Error :`, err);
        throw new Error('SERVICE_FIND_USER_BY_EMAIL');
    }
    if(userData === null)throw new Error('NOT_FOUND');
    const tempId = userData.id.substring(0, userData.id.length-3);
    mailer.sendId(tempId+'***', userData.email);
    return {data : 1};
}
const findPwSendMail = async(id, email) => {
    const emailNo = mailer.makeEmailNo(6); // 6자리 인증번호
    try{
        await anonymousRepo.saveEmailAuthentication(email, emailNo);
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.error(`Service findPwSendMail Error :`, err);
        throw new Error('SERVICE_FIND_PW_SEND_EMAIL');
    }
    mailer.sendPw(email, emailNo);
    return {data : 1};

}
const updatePw = async (email, pw, id) => {
    try {
        const result = await anonymousRepo.updatePw(email, pw, id);
        return result;
    }catch(err){
        winston.error(`Service updatePw Error :`, err);
        throw new Error('SERVICE_UPDATE_PW');
    }
}

const forceSignIn = async(id, pw)=> {
    let userData;
    // 1. id pw 해당하는 data 찾기
    try{
        userData = await anonymousRepo.findUserByIdPw(id, pw);
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.error(`Service findUserByIdPw Error  :`, err);
        throw new Error('SERVICE_FIND_USER_BY_ID_PW');
    }
    // 2. 로그인 되어져 있는 강제 로그아웃
    try{
        //이 부분 로그아웃
        await userRepo.logout(userData.userIdx);
        // await userService.logout(userIdx);
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.error(`Service logout Error  :`, err);
        throw new Error('SERVICE_LOGOUT');
    }
    try{
        //userIdx에 해당하는 토큰을 제거 후 로그인 시도
        const result = await signIn(id, pw);
        return result;
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.error(`Service forceSignIn Error  :`, err);
        throw new Error('SERVICE_FORCE_SIGNIN');
    }
}


module.exports = {
    signUp,
    signIn,
    sendEmail,
    checkEmail,
    findIdSendMail,
    findPwSendMail,
    updatePw,
    forceSignIn,
}