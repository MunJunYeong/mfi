const { models, Op } = require('../../lib/db');
const winston = require('../../lib/common/winston');

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
      throw new Error('DB_UPDATE_ROLE');
  }
}

const getUserToken = async (userIdx) => {
  let res;
  try{
    res = await models['userToken'].findOne(
      {
        where : {
          userIdx : userIdx
        }
      }
    )
    return res.token;
  }catch(err){
    winston.error(`Unable to getUserToken[service] :`, err);
    throw new Error('DB_GET_USER_TOKEN');
  }
}

const logout = async (userIdx) => {
  let res;
  try{
    res = await models['userToken'].update(
      {
        token : ''
      },
      {
        where : {
          userIdx : userIdx
        }
      }
    )
    return res;
  }catch(err){
    winston.error(`Unable to logout[service] :`, err);
    throw new Error('DB_LOGOUT');
  }
}
// 토큰 유효성 검사에서
const forceLogout = async (token) => {
  let res;
  try{
    res = await models['userToken'].update(
      {
        token : ''
      },
      {
        where : {
          token : token
        }
      }
    )
    return res;
  }catch(err){
    winston.error(`Unable to forceLogout[service] :`, err);
    throw new Error('DB_FORCE_LOGOUT');
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
    throw new Error('DB_GET_USER');
  }

}

module.exports = {
    updateRole,
    getUser,
    logout,
    forceLogout,
    getUserToken,
}