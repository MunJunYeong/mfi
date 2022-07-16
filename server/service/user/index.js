const winston = require('../../lib/common/winston');
const {user : userRepo} = require('../../repository');
const {Op} = require('../../lib/db');

const getUserData = async (userIdx) => {
  let res;
  try{
    res= await userRepo.getUserData(userIdx);
  }catch(err){
    if(err.message) throw new Error(err.message);
    winston.error(`Service getUserData Error :`, err);
    throw new Error('SERVICE_GET_USER_DATA');
  }
  return res;
}

const updateRole = async (role, userIdx) => {
  let res;
  try{
    res = await userRepo.updateRole(role, userIdx);
  }catch(err){
    if(err.message) throw new Error(err.message);
    winston.error(`Service updateRole Error :`, err);
    throw new Error('SERVICE_UPDATE_ROLE');
  }
  if(res[0]=== 1){
    return role;
  }
}

const updateUserToken = async(token, userIdx) => {
  let res;
  try{
    res=  await userRepo.updateUserToken(token, userIdx);
  }catch(err){
    if(err.message) throw new Error(err.message);
    winston.error(`Service updateUserToken Error :`, err);
    throw new Error('SERVICE_UPDATE_USER_TOKEN');
  }
  return res;
}

const getUserToken = async (userIdx) => {
  let res;
  try{
    res=  await userRepo.getUserToken(userIdx);
  }catch(err){
    if(err.message) throw new Error(err.message);
    winston.error(`Service getUserToken Error :`, err);
    throw new Error('SERVICE_GET_USER_TOKEN');
  }
  return res.token;
}

const logout = async (userIdx) => {
  let res;
  try{
    res = await userRepo.logout(userIdx);
  }catch(err){
    if(err.message) throw new Error(err.message);
    winston.error(`Service logout Error :`, err);
    throw new Error('SERVICE_LOGOUT');
  }
  return res;
}
// 토큰 유효성 검사에서
const forceLogout = async (token) => {
  let res;
  try{
    res = await userRepo.forceLogout(token);
  }catch(err){
    if(err.message) throw new Error(err.message);
    winston.error(`Service forceLogout Error :`, err);
    throw new Error('SERVICE_FORCE_LOGOUT');
  }
  return res;
}

const getUser =  async (page, nickName, limit, offset) => {
  let where = {};
  
  where.role = {
      [Op.ne] : 'admin'
  }
  if(nickName !== undefined){
      where.nickName = {[Op.like] : `%${nickName}%`
      }
  }
  let res;
  try{
    res = await userRepo.getUser(where, limit, offset);
  }catch(err){
    if(err.message) throw new Error(err.message);
    winston.error(`Service getUser Error :`, err);
    throw new Error('SERVICE_GET_USER');
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