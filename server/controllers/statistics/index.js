const winston = require('../../lib/common/winston');

const {idea : ideaService} = require ('../../service');
const {visitor : visitorService} = require('../../service');
const {anonymous : anonymousService} = require('../../service');

const createIp = async (req, res) => {
    const ip = req.clientIp;
    try{
        await visitorService.createIp(ip);
        res.send({data : ip})
    }catch(err){
        if(err.message === 'DB_FIND_IP')throw new Error(err.message);
        if(err.message === 'DB_CREATE_IP')throw new Error(err.message);
        winston.warn(`Unable to create Ip :`, err);
        throw new Error('UNABLE_CREATEIP');
    }
}

const getUserCount = async(req, res) => {
    try{
        const result = await anonymousService.getUserCount();
        res.send({data : result});
    }catch(err){
        if(err.message === 'DB_GET_USER_COUNT')throw new Error(err.message);
        winston.warn(`Unable to get user cout :`, err);
        throw new Error('UNABLE_USERCOUNT');
    }
}
const getTodayVisitor = async(req, res) => {
    try{
        const result = await visitorService.getTodayVisitor();
        res.send({data : result});
    }catch(err){
        if(err.message === 'DB_GET_TODAY_VISITOR')throw new Error(err.message);
        winston.warn(`Unable to get today visitor :`, err);
        throw new Error('UNABLE_TODAY_VISITOR');
    }
    
}
const getTotalVisitor = async(req, res) => {
    try{
        const result = await visitorService.getTotalVisitor();
        res.send({data : result});
    }catch(err){
        if(err.message === 'DB_GET_TOTAL_VISITOR')throw new Error(err.message);
        winston.warn(`Unable to get total visitor :`, err);
        throw new Error('UNABLE_TOTAL_VISITOR');
    }

}
const getNewsItem = async(req, res) => {
    try{
        const result = await anonymousService.getNewsItem();
        res.send({data : result});
    }catch(err){
        if(err.message === 'DB_GET_NEWS_ITEM')throw new Error(err.message);
        winston.warn(`Unable to get newsItem :`, err);
        throw new Error('UNABLE_NEWITEMS');
    }
}
const getIdeaCount = async(req, res) => {
    try{
        const result = await ideaService.getIdeaCount();
        res.send({data : result});
    }catch(err){
        if(err.message === 'DB_GET_IDEA_COUNT')throw new Error(err.message);
        winston.warn(`Unable to getIdeaCout :`, err);
        throw new Error('UNABLE_IDEA_COUNT');
    }
    
}

module.exports = {
    createIp,
    getUserCount,
    getTodayVisitor,
    getTotalVisitor,
    getNewsItem,
    getIdeaCount
}