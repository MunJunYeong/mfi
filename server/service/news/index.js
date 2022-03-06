const { models, Op } = require('../../lib/db');

const createNews = async (data)=>{
    let res; 
    // tit, subcontent, oid, aid, ohnm, dt
    try { 
        result = await models['news'].create({
            tit : data.tit,
            subcontent : data.subcontent,
            oid : data.oid,
            aid : data.aid,
            ohnm : data.ohnm,
            dt : data.dt
        })
    } catch (err) {
        res = {}
    }
}
const deleteNews = async ()=>{
    await models['news'].destroy({
        where : {},
        truncate : true
    })
}
module.exports = {
    createNews,
    deleteNews
}