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

const getUser =  async (where, limit, offset) => {
  const data = await models['user'].findAndCountAll({
    where,
    order : [['userIdx', 'DESC']],
    order : [['role', 'DESC']],
    limit,
    offset
  })
  return data;
}

module.exports = {
    updateRole,
    getUser
}