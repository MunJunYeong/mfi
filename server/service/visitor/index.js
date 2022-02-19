const { models, Op } = require('../../lib/db');

const createIp = async (ip)=>{
    const result = await models['visitor'].create({
        ip : ip
    })
    return result;
}

module.exports = {
    createIp
}