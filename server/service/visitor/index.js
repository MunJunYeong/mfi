const { models, Op } = require('../../lib/db');

const createIp = async (ip)=>{
    let res;
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