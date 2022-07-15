const winston = require('../../lib/common/winston');
const {statistics : statisticsService} = require('../../service');


const createIp = async (req, res) => {
    const ip = req.clientIp;
    try{
        await statisticsService.createIp(ip);
    }catch(err){
        
    }
    res.send({data : ip})
}

const getUserCount = async(req, res) => {
    let result;
    try{
        result = await statisticsService.getUserCount();
    }catch(err){

    }
    res.send({data : result});
}
const getTodayVisitor = async(req, res) => {
    let result;
    try{
        result = await statisticsService.getTodayVisitor();
    }catch(err){
        
    }
    res.send({data : result});
    
}
const getTotalVisitor = async(req, res) => {
    let result;
    try{
        result = await statisticsService.getTotalVisitor();
    }catch(err){
        
    }
    res.send({data : result});

}
const getNewsItem = async(req, res) => {
    let result;
    try{
        result = await statisticsService.getNewsItem();
    }catch(err){
        if(err.message === 'DB_GET_NEWS_ITEM')throw new Error(err.message);
        winston.warn(`Unable to get newsItem :`, err);
        throw new Error('UNABLE_NEWITEMS');
    }
    res.send({data : result});
}

const getIdeaCount = async(req, res) => {
    let result;
    try{
        result = await statisticsService.getIdeaCount();
    }catch(err){
        
    }
    res.send({data : result});
    
}

module.exports = {
    createIp,
    getUserCount,
    getTodayVisitor,
    getTotalVisitor,
    getNewsItem,
    getIdeaCount
}