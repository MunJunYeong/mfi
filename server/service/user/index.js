const { models, Op } = require('../../lib/db');

const updateRole = async (role, userIdx) => {
  try{
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
  }catch(err){
      winston.error(`Unable to updateRole[service] :`, err);
      throw new Error(82);
  }
 
    
}

const getUser =  async (where, limit, offset) => {
  try{
    const data = await models['user'].findAndCountAll({
      where,
      attributes : {
        exclude : ['id', 'pw', 'email']
      },
      order : [
        ['role', 'DESC'],
        ['userIdx', 'ASC'],
        
      ],
      limit,
      offset
    })
    return data;
  }catch(err){
    winston.error(`Unable to getUser[service] :`, err);
    throw new Error(83);
  }

}

module.exports = {
    updateRole,
    getUser
}