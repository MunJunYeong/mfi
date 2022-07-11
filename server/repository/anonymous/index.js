const {models, Op} = require('../../lib/db');
const winston = require('../../lib/common/winston');


const findUserById = async (id) => {
    try{
        const res= await models['user'].findOne({
            where : {
                id : id
            },
            // attributes : {
            //     exclude : ['pw', 'nickName', 'role', 'email']
            // },
        });
        return res;
    }catch(err){
        winston.error(``, err);
        throw new Error('~');
    }
}
const findUserByNickName = async (nickName) => {
    try{
        const res= await models['user'].findOne({
            where : {
                nickName : nickName
            },
            // attributes : {
            //     exclude : ['pw', 'nickName', 'role', 'email']
            // },
        });
        return res;
    }catch(err){
        winston.error(``, err);
        throw new Error('DB_IS_DUPLICATED_NICKNAME');
    }
}
const findUserByEmail = async (email) => {
    try{
        const res= await models['user'].findOne({
            where : {
                email : email
            },
            // attributes : {
            //     exclude : ['pw', 'nickName', 'role', 'email']
            // },
        });
        return res;
    }catch(err){
        winston.error(``, err);
        throw new Error('DB_IS_DUPLICATED_EMAIL');
    }
}
const signUp = async (id, pw, nickName, email, role) => {
    try{
        const res = await models['user'].create({
            id : id,
            pw : pw,
            nickName : nickName,
            email : email,
            role : role
        });
        return res;
    }catch(err){
        winston.error(`Unable to signUp[servcie] :`, err);
        throw new Error('DB_SIGNUP');
    }
}
const makeUserToken= async (idx)=> {
    try{
        const res = await models['userToken'].create({
            userIdx : idx,
            token : '',
            refresh : '',
        })
        return res;
    }catch(err){
        winston.error(`Unable to makeUserToken[servcie] :`, err);
        throw new Error('DB_MAKE_USER_TOKEN');
    }
}
const  getUserCount = async ()=>{
    try{
        const result  = await models['user'].count();
        return result;
    }catch(err){
        winston.warn(`Unable to getUserCount[servcie] :`, err);
        throw new Error('DB_GET_USER_COUNT');
    }
}
const  getNewsItem = async ()=>{
    try{
        const result  = await models['news'].findAll({});
        return result;
    }catch(err){
        winston.warn(`Unable to getNewsItem[servcie] :`, err);
        throw new Error('DB_GET_NEWS_ITEM');
    }
}
const haveUserToken = async (userIdx)=> {
    try{
        const result = await models['userToken'].findOne({
            where : {
                userIdx : userIdx
            }
        })
        return result;
    }catch(err){
        winston.error(`Unable to haveUserToken[service] :`, err);
        throw new Error('DB_HAVE_USER_TOKEN');
    }
}
// userToken table token attribute save
const saveUserToken = async (idx ,token) => {
    try {
        await models['userToken'].update(
            {
                token : token
            },
            {
                where : {
                    userIdx : idx,
                },
            }
        )
    }catch(err){
        winston.error(`Unable to saveUserToken[service] :`, err);
        throw new Error('DB_SAVE_USER_TOKEN');
    }
}
const saveEmailAuthentication = async (email, emailNo) => {
    try{
        const res =  await models['authentication'].create({
            email : email,
            no : emailNo
        });
        return res;        
    }catch(err){
        winston.error(`Unable to sendEmail[servcie] :`, err);
        throw new Error('DB_SEND_EMAIL');
    }
}
const findAuthNoByEmail = async (email) => {
//예의치 못하게 2개가 생기는 경우를 방지하고자 findOne이 아닌 findAll 사용-> 가장 최근 인증번호
    try{
        const res = await models['authentication'].findAll({
            where : {
                email : email
            },
            order: [
                ['idx', 'DESC'],
            ],
        })
        return res;
    }catch(err){
        winston.error(`Unable to findAuthNo for checkEmail[servcie] :`, err);
        throw new Error('DB_FIND_AUTH_NO');
    }
}

const deleteAuthNo = async(email) => {
    try{
        const res = await models['authentication'].destroy({
            where : {
                email : email
            }
        })
        return res;
    }catch(err){
        winston.error(`:`, err);
        throw new Error('');
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
        throw new Error('DB_UPDATE_PW');
    }
}

const findIdUser = async (id, pw) => {
    let findUser;
    try {
        findUser = await models['user'].findOne({
            where : {
                id : id,
                pw : pw
            },
            attributes : {
                exclude : ['id', 'pw', 'nickName', 'role']
            },
        });
        return findUser.userIdx;
    }catch(err){
        winston.error(`Unable to findIdUser for forceSignIn[servcie] :`, err);
        throw new Error('DB_FIND_USER_PARA_IDPW');
    }
}

module.exports = {
    signUp,
    makeUserToken,
    getUserCount,
    updatePw,
    getNewsItem,
    findIdUser,

    findUserById,
    findUserByNickName,
    findUserByEmail,
    haveUserToken,
    saveUserToken,
    saveEmailAuthentication,
    findAuthNoByEmail,
    deleteAuthNo,
}