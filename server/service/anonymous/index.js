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
    const findUser = await models['user'].findOne({
        where : {
            email : email
        }
    });
    if(findUser === null){
        const emailNo = utils.makeEmailNo(6); // 6자리 인증번호
        const result =  await models['authentication'].create({
            email : email,
            no : emailNo
        });
        // send email method
        utils.sendEmail(email, emailNo);
        return result;        
    }else { // 이미 회원가입된 이메일 정보가 존재할 경우
        return {message : 'exist email'};
    }
}
const checkEmail = async(email, no) => {
    //예의치 못하게 2개가 생기는 경우를 방지하고자 findOne이 아닌 findAll 사용-> 가장 최근 인증번호
    const findAuthNo = await models['authentication'].findAll({
        where : {
            email : email
        },
        order: [
            ['idx', 'DESC'],
        ],
    })
    if(findAuthNo[0] === undefined){
        return {message : 'wrong no'};
    }
    if(findAuthNo[0].dataValues.no === no){
        await models['authentication'].destroy({
            where : {
                email : email
            }
        })
        return {data : 1};
    }else {
        return {message : 'wrong no'};
    }
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
    checkEmail,
}