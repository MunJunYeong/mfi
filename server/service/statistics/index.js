const winston = require('../../lib/common/winston');
const {statistics : statisticsRepo} = require('../../repository');


const createIp = async (ip)=>{
    let findIp;
    try{
        findIp = await statisticsRepo.findVisitorByIp(ip);
    }catch(err){
        if(err.message) throw new Error(err.message);
        winston.error(`Service Validation findIp  Error :`, err);
        throw new Error('SERVICE_VALIDATION_FIND_IP');
    }
    
    if(findIp === null){
        let res;
        try{
            res = await statisticsRepo.createIp(ip);
        }catch(err){
            if(err.message) throw new Error(err.message);
            winston.error(`Service createIp Error :`, err);
            throw new Error('SERVICE_CREATE_IP');
        }
        return res;
    }
}

const getUserCount = async ()=> {
    let res;
    try{
        res = await statisticsRepo.getUserCount();
    }catch(err){
        if(err.message) throw new Error(err.message);
        winston.error(`Service getUserCount Error :`, err);
        throw new Error('SERVICE_GET_USER_COUNT');
    }
    return res;
}
const getTodayVisitor = async ()=>{
    let res;
    try{
        res = await statisticsRepo.getTodayVisitor();
    }catch(err){
        if(err.message) throw new Error(err.message);
        winston.error(`Service getTodayVisitor Error :`, err);
        throw new Error('SERVICE_GET_TODAY_VISITOR');
    }
    return res;
}
const getTotalVisitor = async ()=>{
    let sum;
    try{
        let today = await statisticsRepo.getTodayVisitor();
        let totalData = await statisticsRepo.getTotalVisitor();
        sum = parseInt(totalData.total) + today ;
    }catch(err){
        if(err.message) throw new Error(err.message);
        winston.error(`Service getTotalVisitor Error :`, err);
        throw new Error('SERVICE_GET_TOTAL_VISITOR');
    }
    return sum;
}

const updateTotalVisitor = async (totalCnt)=>{
    try{
        const updateTotalVisitorCount = await statisticsRepo.updateTotalVisitor(totalCnt);
        const deleteVisitor = await statisticsRepo.deleteVisitor();
        return deleteVisitor;
    }catch(err){
        if(err.message) throw new Error(err.message);
        winston.error(`Service updateTotalVisitor Error :`, err);
        throw new Error('SERVICE_UPDATE_TOTAL_VISITOR');
    }
    
}

const getNewsItem = async ()=>{
    let res; 
    try{
        res = await statisticsRepo.getNewsItem();
    }catch(err) {
        if(err.message) throw new Error(err.message);
        winston.error(`Service  Error :`, err);
        throw new Error('SERVICE_GET_NEWS_ITEM');
    }
    return res;
}

const createNews = async (data)=>{
    let res; 
    try{
        res = await statisticsRepo.createNews(data.tit, data.subcontent, data.oid, data.aid, data.ohnm, data.dt);
    }catch(err) {
        if(err.message) throw new Error(err.message);
        winston.error(`Service createNews Error :`, err);
        throw new Error('SERVICE_CREATE_NEWS');
    }
    // tit, subcontent, oid, aid, ohnm, dt
}
const deleteNews = async ()=>{
    try{
        await statisticsRepo.deleteNews();
    }catch(err){
        if(err.message) throw new Error(err.message);
        winston.error(`ServicedeleteNews  Error :`, err);
        throw new Error('SERVICE_DELETE_NEWS');
    }
}
const getIdeaCount = async ()=>{
    let res;
    try{
        res = await statisticsRepo.getIdeaCount();
    }catch(err){
        if(err.message) throw new Error(err.message);
        winston.error(`Service getIdeaCount Error :`, err);
        throw new Error('SERVICE_GET_IDEA_COUNT');
    }
    return res;
}


module.exports = {
    createIp, 
    getUserCount,getTotalVisitor, getTodayVisitor, updateTotalVisitor,
    getNewsItem, createNews, deleteNews, 
    getIdeaCount,
}