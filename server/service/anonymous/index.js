const {models, Op} = require('../../lib/db');
const {utils} = require('../../lib/common')
const winston = require('../../lib/common/winston');
const jwt = require('jsonwebtoken');


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

//중복되는 메소드
const findUser = async (email) => {
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
        return findUser;
    }catch(err){
        winston.error(`Unable to findUser for sendEmail[servcie] :`, err);
        throw new Error(53);
    }
}


const signUp = async (id, pw, nickName, email, role) => {
    //혹시나 회원가입이 이미 되었는데도 또 2번 이상의 요청이 가서 생기는 경우 예외처리
    let result;
    if(await findUser(email) === null){
        try{
            result = await models['user'].create({
                id : id,
                pw : pw,
                nickName : nickName,
                email : email,
                role : role
            });
            await makeUserToken(result.userIdx);
            return result;
        }catch(err){
            winston.error(`Unable to signUp[servcie] :`, err);
            throw new Error(52);
        }

    }else {
        throw new Error(124);
    }
    
}
const makeUserToken= async (idx)=> {
    console.log(idx)
    try{
        await models['userToken'].create({
            userIdx : idx
        })
    }catch(err){
        winston.error(`Unable to makeUserToken[servcie] :`, err);
        throw new Error(84);
    }
}
const sendEmail = async (email) => {
    if(await findUser(email) === null){
        try{
            const emailNo = utils.makeEmailNo(6); // 6자리 인증번호
            const result =  await models['authentication'].create({
                email : email,
                no : emailNo
            });
            // send email method
            utils.sendEmail(email, emailNo);
            return result;        
        }catch(err){
            winston.error(`Unable to sendEmail[servcie] :`, err);
            throw new Error(54);
        }   
    }else {
        throw new Error(119);
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
        throw new Error(120);
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
    }else {
        throw new Error(121);
    }
}
//find id , pw
const findIdSendMail = async(email) => {
    //exclude 차이로 독자적인 findUser 필요
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
        throw new Error(101);
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
    if(await findUser(email) === null){
        throw new Error(101);
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
    let findId;
    // 1. 아이디가 존재하는지 확인한다.
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
        const idData = {
            ...findId.toJSON()
        }
        // 2. 비밀번호가 일치하는지 확인한다.
        if(pw === idData.pw){
            // 3. userToken Table에 token이 저장되어져 있는지 확인한다 (true : 이미 로그인되어져 있음.)
            if(await haveUserToken(idData.userIdx)){
                
            }else {
                // 로그인되어져 있지 않을 경우
                try{
                    delete idData.pw;
                    // 토큰 유효기간은 2days
                    const options = {
                        expiresIn : "48h"
                    }
                    accessToken = jwt.sign(idData, 'shhhhh', options);
                    // await saveUserToken(idData.userIdx, accessToken);
                    return {token : accessToken};
                }catch(err){
                    winston.error(`Unable to signIn[service] :`, err);
                    throw new Error(63);
                }
            }
            
        }else {
            throw new Error(122);
        }
    }else {
        throw new Error(123);
    }
}

// userToken table token attribute save
const saveUserToken = async (idx ,token) => {
    try {
        await models['userToken'].update(
            {
            token : token,
            },
            {
                where : {
                    userIdx : idx,
                },
            }
        )
    }catch(err){
        winston.error(`Unable to saveUserToken[service] :`, err);
        throw new Error(86);
    }
}
//userToken table에 해당 idx가 로그인되어져 있는지 확인
const haveUserToken = async (userIdx)=> {
    try{
        const result = await models['userToken'].findOne({
            where : {
                userIdx : userIdx
            }
        })
        if(result.token === null || result.token.length === 0){
            return false;
        }else {
            return true;
        }
    }catch(err){
        winston.error(`Unable to haveUserToken[service] :`, err);
        throw new Error(85);
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
    makeUserToken,
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