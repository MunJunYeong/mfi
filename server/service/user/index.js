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
    if(result[0] === 1){
      return role;
    }else{
      return {message : 'wrong data'};
    }
    
}

const getUser =  async (where, limit, offset) => {
  const data = await models['user'].findAndCountAll({
    where,
    attributes : {
      exclude : ['id', 'pw', 'email']
    },
    order : [
      ['role', 'ASC'],
      ['userIdx', 'ASC'],
      
    ],
    limit,
    offset
  })
  return data;
}

module.exports = {
    updateRole,
    getUser
}