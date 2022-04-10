const { models, Op } = require('../../lib/db');
const winston = require('../../lib/common/winston');

const createNews = async (data)=>{
    let res; 
    // tit, subcontent, oid, aid, ohnm, dt
    try{
        res = await models['news'].create({
            tit : data.tit,
            subcontent : data.subcontent,
            oid : data.oid,
            aid : data.aid,
            ohnm : data.ohnm,
            dt : data.dt
        })
    }catch(err){
        winston.warn(`Unable to createNews[service] :`, err);
        throw new Error('DB_CREATE_NEWS');
    }
}
const deleteNews = async ()=>{
    try{
        await models['news'].destroy({
            where : {},
            truncate : true
        })
    }catch(err){
        winston.warn(`Unable to deleteNews[service] :`, err);
        throw new Error('DB_DELETE_NEWS');
    }
    
}
module.exports = {
    createNews,
    deleteNews
}