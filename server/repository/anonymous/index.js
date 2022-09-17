const {models, Op} = require('../../lib/db');
const winston = require('../../lib/common/winston');
const { Sequelize } = require('sequelize/types');


const findUserById = async (id) => {
    try{
        const res= await models['user'].findOne({
            where : {
                id : id
            },
            // attributes로 데이터를 빼줄지
            // attributes : {
            //     exclude : ['pw', 'nickName', 'role', 'email']
            // },
        });
        return res;
    }catch(err){
        winston.error(`DB findUserById Error : `, err);
        throw new Error('DB_FIND_USER_BY_ID');
    }
}
const findUserByNickName = async (nickName) => {
    try{
        const res= await models['user'].findOne({
            where : {
                nickName : nickName
            },
        });
        return res;
    }catch(err){
        winston.error(`DB findUserByNickName Error : `, err);
        throw new Error('DB_FIND_USER_BY_NICKNAME');
    }
}
const findUserByEmail = async (email) => {
    try{
        const res= await models['user'].findOne({
            where : {
                email : email
            },
        });
        return res;
    }catch(err){
        winston.error(`DB findUserByEmail Error : `, err);
        throw new Error('DB_FIND_USER_BY_EMAIL');
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
        winston.error(`DB signUp Error :`, err);
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
        winston.error(`DB makeUserToken Error :`, err);
        throw new Error('DB_MAKE_USER_TOKEN');
    }
}
// 트랜잭션 예시
// const createNewUser = async () => {
//     Sequelize.transaction((t) => {
//         const res = await models['user'].create({
//             id : id,
//             pw : pw,
//             nickName : nickName,
//             email : email,
//             role : role
//         }, t);
//         if (!res) throw Error();
//         const res = await models['userToken'].create({
//             userIdx : idx,
//             token : '',
//             refresh : '',
//         }, t)
//     })
// }

const haveUserToken = async (userIdx)=> {
    try{
        const result = await models['userToken'].findOne({
            where : {
                userIdx : userIdx
            }
        })
        return result;
    }catch(err){
        winston.error(`DB haveUserToken Error :`, err);
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
        winston.error(`DB saveUserToken Error :`, err);
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
        winston.error(`DB saveEmailAuthentication Error :`, err);
        throw new Error('DB_SAVE_EMAIL_AUTHENTICATION');
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
        winston.error(`DB findAuthNoByEmail Error :`, err);
        throw new Error('DB_FIND_AUTH_NO_BY_EMAIL');
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
        winston.error(`DB deleteAuthNo Error:`, err);
        throw new Error('DB_DELETE_AUTH_NO');
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
        winston.error(`DB updatePw Error :`, err);
        throw new Error('DB_UPDATE_PW');
    }
}

const findUserByIdPw = async (id, pw) => {
    let res;
    try {
        res = await models['user'].findOne({
            where : {
                id : id,
                pw : pw
            },
            attributes : {
                exclude : ['id', 'pw', 'nickName', 'role']
            },
        });
        return res;
    }catch(err){
        winston.error(`DB findUserByIdPw Error :`, err);
        throw new Error('DB_FIND_USER_BY_ID_PW');
    }
}

module.exports = {
    signUp,
    makeUserToken,
    updatePw,
    findUserByIdPw,
    findUserById,
    findUserByNickName,
    findUserByEmail,
    haveUserToken,
    saveUserToken,
    saveEmailAuthentication,
    findAuthNoByEmail,
    deleteAuthNo,
}