const {models, Op} = require('../../lib/db');
const {utils} = require('../../lib/common')

const  getUserCount = async ()=>{
    const result  = await models['user'].count();
    return result;

}

const signUp = async (id, pw, nickName, email, role) => {
    const result = await models['user'].create({
        id : id,
        pw : pw,
        nickName : nickName,
        email : email,
        role : role
    });
    return result;
}
const sendEmail = async (email) => {
    const emailNo = utils.makeEmailNo(6); // 6자리 인증번호
    const result =  await models['authentication'].create({
        email : email,
        no : emailNo
    })
    // send mail ~
    return result;
}

const signIn = async (id, pw) => {
    let accessToken;
    const jwt = require('jsonwebtoken');
    const findId = await models['user'].findOne({
        where : {
            id : id
        }
    });
    if(findId){
        const tokenData = {
            ...findId.toJSON()
        }
        if(pw === tokenData.pw){
            delete tokenData.pw;
            accessToken = jwt.sign(tokenData, 'shhhhh');
            return {token : accessToken};
        }else {
            return {message : 'wrong pw'};
        }        
    }else {
        return {message : 'not exist id'};
    }
} 
const duplicateId = async (id) => {
    const result = await models['user'].findOne({
        where : {
            id : id
        }
    });
    return result;
} 
const duplicateNickName = async (nickName) => {
    const result = await models['user'].findOne({
        where : {
            nickName : nickName
        }
    });
    return result;
} 

module.exports = {
    signUp,
    signIn,
    duplicateId,
    duplicateNickName,
    getUserCount,
    sendEmail,
}