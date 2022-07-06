const {models, Op} = require('../../lib/db');

// null일 경우 true -> 없을 경우가 return true;
const isDuplicatedId = async (id) => {
    let res;
    try{
    res= await models['user'].findOne({
        where : {
            id : id
        },
        attributes : {
            exclude : ['pw', 'nickName', 'role', 'email']
        },
    });
    }catch(err){

    }
    if(res === null) return true;
    return false;
}
const isDuplicatedNickName = async (nickName) => {
    let res;
    try{
        res= await models['user'].findOne({
            where : {
                nickName : nickName
            },
            attributes : {
                exclude : ['pw', 'nickName', 'role', 'email']
            },
        });
    }catch(err){

    }
    if(res === null) return true;
    return false;
}
const isDuplicatedEmail = async (email) => {
    let res;
    try{
        res= await models['user'].findOne({
            where : {
                email : email
            },
            attributes : {
                exclude : ['pw', 'nickName', 'role', 'email']
            },
        });
    }catch(err){

    }
    if(res === null) return true;
    return false;
}

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
        throw new Error('DB_HAVE_USER_TOKEN');
    }
}

module.exports = {
    isDuplicatedId, isDuplicatedNickName, isDuplicatedEmail,
    haveUserToken, 
}

// let res;
//     try{

//     }catch(err){

//     }