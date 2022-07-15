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
        winston.warn(`Unable to findIp for createIp[service] :`, err);
        throw new Error('DB_FIND_IP');
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
        winston.warn(`Unable to createIp[service] :`, err);
        throw new Error('DB_CREATE_IP');
    }
    return res;
}

const getTodayVisitor = async ()=> {
    let res;
    try{
        res = await models['visitor'].count();
    }catch(err){
        
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

    }
    return res;
}
const getNewsItem = async ()=>{
    try{
        const result  = await models['news'].findAll({});
        return result;
    }catch(err){
        winston.warn(`Unable to getNewsItem[servcie] :`, err);
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
        winston.warn(`Unable to createNews[service] :`, err);
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

    }
    return res;
}

const getIdeaCount = async ()=>{
    let res;
    try{
        res  = await models['idea'].count();
    }catch(err){
        winston.warn(`Unable to getIdeaCount[service] :`, err);
        throw new Error('DB_GET_IDEA_COUNT');
    }
    return res;
}


/*
const  = async ()=> {
    let res;
    try{

    }catch(err){

    }
    return res;
}
*/

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