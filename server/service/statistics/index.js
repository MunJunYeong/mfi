const winston = require('../../lib/common/winston');
const {statistics : statisticsRepo} = require('../../repository');


const createIp = async (ip)=>{
    let findIp;
    try{
        findIp = await statisticsRepo.findVisitorByIp(ip);
    }catch(err){
        
    }
    
    if(findIp === null){
        let res;
        try{
            res = await statisticsRepo.createIp(ip);
        }catch(err){

        }
        return res;
    }
}

const getUserCount = async ()=> {
    let res;
    try{
        res = await statisticsRepo.getUserCount();
    }catch(err){
        
    }
    return res;
}
const getTodayVisitor = async ()=>{
    let res;
    try{
        res = await statisticsRepo.getTodayVisitor();
    }catch(err){
        
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
        
    }
    return sum;
}

const updateTotalVisitor = async (totalCnt)=>{
    try{
        const updateTotalVisitorCount = await statisticsRepo.updateTotalVisitor(totalCnt);
        const deleteVisitor = await statisticsRepo.deleteVisitor();
        return deleteVisitor;
    }catch(err){
        winston.warn(`Unable to updateTotalVisitor[service] :`, err);
        throw new Error('DB_UPDATE_TOTAL_VISITOR');
    }
    
}

const getNewsItem = async ()=>{
    let res; 
    try{
        res = await statisticsRepo.getNewsItem();
    }catch(err) {
        
    }
    return res;
}

const createNews = async (data)=>{
    let res; 
    try{
        res = await statisticsRepo.createNews(data.tit, data.subcontent, data.oid, data.aid, data.ohnm, data.dt);
    }catch(err) {
        
    }
    // tit, subcontent, oid, aid, ohnm, dt
}
const deleteNews = async ()=>{
    try{
        await statisticsRepo.deleteNews();
    }catch(err){
        winston.warn(`Unable to deleteNews[service] :`, err);
        throw new Error('DB_DELETE_NEWS');
    }
}
const getIdeaCount = async ()=>{
    let res;
    try{
        res = await statisticsRepo.getIdeaCount();
    }catch(err){
        winston.warn(`Unable to deleteNews[service] :`, err);
        throw new Error('DB_DELETE_NEWS');
    }
    return res;
}


module.exports = {
    createIp, 
    getUserCount,getTotalVisitor, getTodayVisitor, updateTotalVisitor,
    getNewsItem, createNews, deleteNews, 
    getIdeaCount,
}