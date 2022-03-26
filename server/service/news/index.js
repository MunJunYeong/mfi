const { models, Op } = require('../../lib/db');

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
        throw new Error(76);
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
        throw new Error(77);
    }
    
}
module.exports = {
    createNews,
    deleteNews
}