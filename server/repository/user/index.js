const {models, Op} = require('../../lib/db');
const winston = require('../../lib/common/winston');


const getUserData = async (userIdx) => {
    let res;
    try{
        res = await models['user'].findOne(
        {
          where : {
            userIdx : userIdx
          },
          attributes : {
            exclude : ['id', 'pw' , 'status']
        },
        },
      )
    }catch(err){
        winston.error(`Unable to getUserData[service] :`, err);
        throw new Error('DB_GET_USER_DATA');
    }
    return res;
  }
  
  const updateRole = async (role, userIdx) => {
    let res;
    try{
      res = await models['user'].update(
        {
          role : role
        },
        {
          where : {
            userIdx : userIdx
          }
        }
      )
      
    }catch(err){
      winston.error(`Unable to updateRole[service] :`, err);
      throw new Error('DB_UPDATE_ROLE');
    }
    return res;
  }
  
  const updateUserToken = async(token, userIdx) => {
    let res;
    try{
      res = await models['userToken'].update(
        {
          token : token
        },
        {
          where : {
            userIdx : userIdx
          }
        }
      )
    }catch(err){
        winston.error(`Unable to updateUserToken[service] :`, err);
        throw new Error('DB_UPDATE_USERTOKEN');
    }
    return res;
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
    }catch(err){
        winston.error(`Unable to getUserToken[service] :`, err);
        throw new Error('DB_GET_USER_TOKEN');
    }
    return res;
  }
  
  const logout = async (userIdx) => {
    let res;
    try{
      res = await models['userToken'].update(
        {
          token : '',
        },
        {
          where : {
            userIdx : userIdx
          }
        }
      )
    }catch(err){
        winston.error(`Unable to logout[service] :`, err);
        throw new Error('DB_LOGOUT');
    }
    return res;
  }
  // 토큰 유효성 검사에서
  const forceLogout = async (token) => {
    let res;
    try{
      res = await models['userToken'].update(
        {
          token : '',
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
    let res;
    try{
        res = await models['user'].findAndCountAll({
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
    }catch(err){
        winston.error(`Unable to getUser[service] :`, err);
        throw new Error('DB_GET_USER');
    }
    return res;
  }


  module.exports = {
    updateRole,
    updateUserToken,
    getUser,
    logout,
    forceLogout,
    getUserToken,
    getUserData,
}