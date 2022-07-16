const {models, Op} = require('../../lib/db');
const winston = require('../../lib/common/winston');


const getUserCount = async ()=>{
    try{
        const result  = await models['user'].count();
        return result;
    }catch(err){
        winston.warn(`DB getUserCount Error :`, err);
        throw new Error('DB_GET_USER_COUNT');
    }
}

const findVisitorByIp = async (ip)=>{
    let res;
    try{
        res = await models['visitor'].findOne({
            where : {
                ip : ip
            }
        })
    }catch(err){
        winston.warn(`DB findVisitorByIp Error :`, err);
        throw new Error('DB_FIND_VISITOR_BY_IP');
    }
    return res;
}
const createIp = async (ip) => {
    let res;
    try{
        res = await models['visitor'].create({
            ip : ip
        })
    }catch(err){
        winston.warn(`DB createIp Error :`, err);
        throw new Error('DB_CREATE_IP');
    }
    return res;
}

const getTodayVisitor = async ()=> {
    let res;
    try{
        res = await models['visitor'].count();
    }catch(err){
        winston.warn(`DB getTodayVisitor Error :`, err);
        throw new Error('DB_GET_TODAY_VISITOR');
    }
    return res;
}
const getTotalVisitor = async ()=> {
    let res;
    try{
        res = await models['totalVisitor'].findOne({
            idx : 1
        });
    }catch(err){
        winston.warn(`DB getTotalVisitor Error :`, err);
        throw new Error('DB_GET_TOTAL_VISITOR');
    }
    return res;
}
const updateTotalVisitor = async (totalCnt)=> {
    let res;
    try{
        res = await models['totalVisitor'].update(
            {
                total : totalCnt
            },
            {
                where : {
                    idx : 1
                }
            }
        )
    }catch(err){
        winston.warn(`DB updateTotalVisitor Error :`, err);
        throw new Error('DB_UPDATE_TOTAL_VISITOR');
    }
    return res;
}
const deleteVisitor = async ()=> {
    let res;
    try{
        res = await models['visitor'].destroy({
            where : {},
            truncate : true
        });
    }catch(err){
        winston.warn(`DB deleteVisitor Error :`, err);
        throw new Error('DB_DELETE_VISITOR');
    }
    return res;
}
const getNewsItem = async ()=>{
    try{
        const result  = await models['news'].findAll({});
        return result;
    }catch(err){
        winston.warn(`DB getNewsItem Error :`, err);
        throw new Error('DB_GET_NEWS_ITEM');
    }
}
const createNews = async (tit, subcontent, oid, aid, ohnm, dt)=> {
    let res;
    try{
        res = await models['news'].create({
            tit : tit,
            subcontent : subcontent,
            oid : oid,
            aid : aid,
            ohnm : ohnm,
            dt : dt
        })
    }catch(err){
        winston.warn(`DB createNews Error :`, err);
        throw new Error('DB_CREATE_NEWS');
    }
    return res;
}

const deleteNews = async()=> {
    let res;
    try{
        res = await models['news'].destroy({
            where : {},
            truncate : true
        })
    }catch(err){
        winston.warn(`DB deleteNews Error :`, err);
        throw new Error('DB_DELETE_NEWS');
    }
    return res;
}

const getIdeaCount = async ()=>{
    let res;
    try{
        res  = await models['idea'].count();
    }catch(err){
        winston.warn(`DB getIdeaCount Error :`, err);
        throw new Error('DB_GET_IDEA_COUNT');
    }
    return res;
}

module.exports = {
    getUserCount,
    getNewsItem,
    findVisitorByIp,
    createIp,
    getTodayVisitor,
    getTotalVisitor,
    updateTotalVisitor,
    deleteVisitor,
    createNews,deleteNews,
    getIdeaCount,
}