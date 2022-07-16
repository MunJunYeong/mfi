const winston = require('../../lib/common/winston');
const {statistics : statisticsService} = require('../../service');


const createIp = async (req, res) => {
    const ip = req.clientIp;
    try{
        await statisticsService.createIp(ip);
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.warn(`Controller createIp Error :`, err);
        throw new Error('CONTROLLER_CREATE_IP');
    }
    res.send({data : ip})
}

const getUserCount = async(req, res) => {
    let result;
    try{
        result = await statisticsService.getUserCount();
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.warn(`Controller getUserCount Error :`, err);
        throw new Error('CONTROLLER_GET_USER_COUNT');
    }
    res.send({data : result});
}
const getTodayVisitor = async(req, res) => {
    let result;
    try{
        result = await statisticsService.getTodayVisitor();
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.warn(`Controller getTodayVisitor Error :`, err);
        throw new Error('CONTROLLER_GET_TODAY_VISITOR');
    }
    res.send({data : result});
    
}
const getTotalVisitor = async(req, res) => {
    let result;
    try{
        result = await statisticsService.getTotalVisitor();
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.warn(`Controller getTotalVisitor Error :`, err);
        throw new Error('CONTROLLER_GET_TOTAL_VISITOR');
    }
    res.send({data : result});

}
const getNewsItem = async(req, res) => {
    let result;
    try{
        result = await statisticsService.getNewsItem();
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.warn(`Controller getNewsItem Error :`, err);
        throw new Error('CONTROLLER_GET_NEWS_ITEM');
    }
    res.send({data : result});
}

const getIdeaCount = async(req, res) => {
    let result;
    try{
        result = await statisticsService.getIdeaCount();
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.warn(`Controller getIdeaCount Error :`, err);
        throw new Error('CONTROLLER_GET_IDEA_COUNT');
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