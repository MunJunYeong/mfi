const {models, Op} = require('../../lib/db');
const winston = require('../../lib/common/winston');


const  getUserCount = async ()=>{
    try{
        const result  = await models['user'].count();
        return result;
    }catch(err){
        winston.warn(`DB getUserCount Error :`, err);
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


module.exports = {
    getUserCount,
    getNewsItem,
}