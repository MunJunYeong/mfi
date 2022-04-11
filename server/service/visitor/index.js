const { models, Op } = require('../../lib/db');
const winston = require('../../lib/common/winston');

const createIp = async (ip)=>{
    let res;
    let findIp
    try{
        findIp = await models['visitor'].findOne({
            ip : ip
        })
    }catch(err){
        winston.warn(`Unable to findIp for createIp[service] :`, err);
        throw new Error('DB_FIND_IP');
    }
    if(findIp === null){
        try{
            res = await models['visitor'].create({
                ip : ip
            })
            return res;
        }catch(err){
            winston.warn(`Unable to createIp[service] :`, err);
            throw new Error('DB_CREATE_IP');
        }
    }
    
}

const getTodayVisitor = async ()=>{
    try{
        const result = await models['visitor'].count();
        return result;
    }catch(err){
        winston.warn(`Unable to getTodayVisitor[service] :`, err);
        throw new Error('DB_GET_TODAY_VISITOR');
    }
    
}
const getTotalVisitor = async ()=>{
    try{
        let today = await models['visitor'].count();
        let totalData = await models['totalVisitor'].findOne({
            idx : 1
        });
        let sum = parseInt(totalData.total) + today ;
        return sum;
    }catch(err){
        winston.warn(`Unable to getTotalVisitor[service] :`, err);
        throw new Error('DB_GET_TOTAL_VISITOR');
    }

    
}

const updateTotalVisitor = async (totalCnt)=>{
    try{
        const result = await models['totalVisitor'].update(
            {
                total : totalCnt
            },
            {
                where : {
                    idx : 1
                }
            }
        )
        if(parseInt(result) === 1){
            await models['visitor'].destroy({
                where : {},
                truncate : true
            });
        }
        return result;
    }catch(err){
        winston.warn(`Unable to updateTotalVisitor[service] :`, err);
        throw new Error('DB_UPDATE_TOTAL_VISITOR');
    }
    
}

module.exports = {
    createIp, getTodayVisitor, getTotalVisitor, updateTotalVisitor
}