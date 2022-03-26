const {models, Op} = require('../../lib/db');
const {utils} = require('../../lib/common')
const winston = require('../../lib/common/winston');



const  getUserCount = async ()=>{
    try{
        const result  = await models['user'].count();
        return result;
    }catch(err){
        winston.warn(`Unable to getUserCount[servcie] :`, err);
        throw new Error(50);
    }
    
}
const  getNewsItem = async ()=>{
    try{
        const result  = await models['news'].findAll({});
        return result;
    }catch(err){
        winston.warn(`Unable to getNewsItem[servcie] :`, err);
        throw new Error(51);
    }
    

}

const signUp = async (id, pw, nickName, email, role) => {
    try{
        const result = await models['user'].create({
            id : id,
            pw : pw,
            nickName : nickName,
            email : email,
            role : role
        });
        return result;
    }catch(err){
        winston.error(`Unable to signUp[servcie] :`, err);
        throw new Error(52);
    }
    
}
const sendEmail = async (email) => {
    let findUser;
    try{
        findUser = await models['user'].findOne({
            where : {
                email : email
            },
            attributes : {
                exclude : ['id', 'pw', 'nickName', 'role']
            },
        });
    }catch(err){
        winston.error(`Unable to findUser for sendEmail[servcie] :`, err);
        throw new Error(53);
    }
    
    try{
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
            throw new Error('exist email')
            // return {message : 'exist email'};
        }
    }catch(err){
        winston.error(`Unable to sendEmail[servcie] :`, err);
        throw new Error(54);
    }
   
    
}
const checkEmail = async(email, no) => {
    //예의치 못하게 2개가 생기는 경우를 방지하고자 findOne이 아닌 findAll 사용-> 가장 최근 인증번호
    let findAuthNo;
    try{
        findAuthNo = await models['authentication'].findAll({
            where : {
                email : email
            },
            order: [
                ['idx', 'DESC'],
            ],
        })
    }catch(err){
        winston.error(`Unable to findAuthNo for checkEmail[servcie] :`, err);
        throw new Error(55);
    }
    
    if(findAuthNo[0] === undefined){
        throw new Error('fail to send');
    }
    if(findAuthNo[0].dataValues.no === no){
        try{
            await models['authentication'].destroy({
                where : {
                    email : email
                }
            })
            return {data : 1};
        }catch(err){
            winston.error(`Unable to checkEmail :`, err);
            throw new Error(56);
        }
        
    }
}
//find id , pw
const findIdSendMail = async(email) => {
    let findUser;
    try{
        findUser = await models['user'].findOne({
            where : {
                email : email
            },
            attributes : {
                exclude : ['pw', 'nickName', 'role']
            },
        })
    }catch(err){
        winston.error(`Unable to findUser for findIdSendMail[servcie] :`, err);
        throw new Error(57);
    }
    
    if(findUser === null){
        return {message : 'no data'};
    }else {
        try{
            let userInfo = {
                id : findUser.dataValues.id,
                email : findUser.dataValues.email
            };
            let id = userInfo.id.substring(0, userInfo.id.length-3);
            utils.sendId( id+'***' , userInfo.email);
            return {data : 1};
        }catch(err){
            winston.error(`Unable to send findId[service] :`, err);
            throw new Error(58);
        }
        
    }
}

const findPwSendMail = async(id, email) => {
    let findUser;
    try{
        findUser = await models['user'].findOne({
            where : {
                id : id,
                email : email,
            },
            attributes : {
                exclude : ['id', 'pw', 'nickName', 'role']
            },
        })
    }catch(err){
        winston.error(`Unable to findUser for findPwSendMail[servcie] :`, err);
        throw new Error(59);
    }
    
    if(findUser === null){
        return {message : 'no user'};
    }else {
        try{
            const emailNo = utils.makeEmailNo(6); // 6자리 인증번호
            await models['authentication'].create({
                email : email,
                no : emailNo
            });
            utils.sendPw(email, emailNo);
            return {data : 1};
        }catch(err){
            winston.error(`Unable to send findPw[service] :`, err);
            throw new Error(60);
        }
        
    }
}
const updatePw = async (email, pw, id) => {
    try {
        const result = await models['user'].update(
            {
                pw : pw
            },
            {
                where :{
                    email : email,
                    id : id
                }
            }
        )
        return result;
    }catch(err){
        winston.error(`Unable to updatePw[service] :`, err);
        throw new Error(61);
    }
    
}
const signIn = async (id, pw) => {
    let accessToken;
    const jwt = require('jsonwebtoken');
    let findId;
    try{
        findId = await models['user'].findOne({
            where : {
                id : id
            },
            attributes : {
                exclude : ['id']
            },
        });
    }catch(err){
        winston.error(`Unable to findId for signIn[service] :`, err);
        throw new Error(62);
    }
    if(findId){
        try{
            const tokenData = {
                ...findId.toJSON()
            }
            if(pw === tokenData.pw){
                delete tokenData.pw;
                // 토큰 유효기간은 2days
                const options = {
                    option : {
                        expiresIn : "48h"
                    }
                }
                accessToken = jwt.sign(tokenData, 'shhhhh', options.option);
                return {token : accessToken};
            }else {
                return {message : 'wrong pw'};
            } 
        }catch(err){
            winston.error(`Unable to signIn[service] :`, err);
            throw new Error(63);
        }
               
    }else {
        return {message : 'not exist id'};
    }
} 
const duplicateId = async (id) => {
    try{
        const result = await models['user'].findOne({
            where : {
                id : id
            },
            attributes : {
                exclude : ['id', 'pw', 'email', 'nickName', 'role']
            },
        });
        return result;
    }catch(err){
        winston.error(`Unable to duplicatedId[service] :`, err);
        throw new Error(64);
    }
    
} 
const duplicateNickName = async (nickName) => {
    try{
        const result = await models['user'].findOne({
            where : {
                nickName : nickName
            },
            attributes : {
                exclude : ['id', 'pw', 'email', 'nickName', 'role']
            },
        });
        return result;
    }catch(err){
        winston.error(`Unable to duplicatedNickName[service] :`, err);
        throw new Error(65);
    }
    
} 

module.exports = {
    signUp,
    signIn,
    duplicateId,
    duplicateNickName,
    getUserCount,
    sendEmail,
    checkEmail,
    findIdSendMail,
    findPwSendMail,
    updatePw,
    getNewsItem
}