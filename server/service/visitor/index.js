const { models, Op } = require('../../lib/db');

const createIp = async (ip)=>{
    const result = await models['visitor'].create({
        ip : ip
    })
    return result;
}

const getTodayVisitor = async ()=>{
    const result = await models['visitor'].count();
    return result;
}
const getTotalVisitor = async ()=>{
    let today = await models['visitor'].count();
    let totalData = await models['totalVisitor'].findOne({
        idx : 1
    });
    let sum = parseInt(totalData.total) + today ;
    return sum;
}

const updateTotalVisitor = async (totalCnt)=>{
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
}

module.exports = {
    createIp, getTodayVisitor, getTotalVisitor, updateTotalVisitor
}