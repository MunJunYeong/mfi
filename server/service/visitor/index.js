const { models, Op } = require('../../lib/db');
const winston = require('../../lib/common/winston');

const createIp = async (ip)=>{
    let res;
    let findIp;

    //error code : 78에서 에러가 떠서 ip가 없을 경우로 이중 해봤지만 해결 안됨
    try{
        findIp = await models['visitor'].findOne({
            ip : ip
        })
    }catch(err){
        //이 부분 에러 번호 집가서 수정
        // winston.warn(`Unable to findIp[service] :`, err);
        // throw new Error();
    }
    if(findIp === null){
        try{
            res = await models['visitor'].create({
                ip : ip
            })
            return res;
        }catch(err){
            winston.warn(`Unable to createIp[service] :`, err);
            throw new Error(78);
        }
    }
    
}

const getTodayVisitor = async ()=>{
    try{
        const result = await models['visitor'].count();
        return result;
    }catch(err){
        winston.warn(`Unable to getTodayVisitor[service] :`, err);
        throw new Error(79);
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
        throw new Error(80);
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
        throw new Error(81);
    }
    
}

module.exports = {
    createIp, getTodayVisitor, getTotalVisitor, updateTotalVisitor
}