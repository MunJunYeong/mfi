const { models, Op } = require('../../lib/db');

const updateRole = async (role, userIdx) => {
    const result = await models['user'].update(
        {
          role : role
        },
        {
          where : {
            userIdx : userIdx
          }
        }
    )
    return result;
}

module.exports = {
    updateRole
}