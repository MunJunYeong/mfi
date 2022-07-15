const winston = require('../../lib/common/winston');
const {user : userRepo} = require('../../repository');

const getUserData = async (userIdx) => {
  let res;
  try{
    res= await userRepo.getUserData(userIdx);
  }catch(err){

  }
  return res;
}

const updateRole = async (role, userIdx) => {
  let res;
  try{
    res = await userRepo.updateRole(role, userIdx);
  }catch(err){

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

  }
  return res;
}

const getUserToken = async (userIdx) => {
  let res;
  try{
    res=  await userRepo.getUserToken(userIdx);
  }catch(err){

  }
  return res.token;
}

const logout = async (userIdx) => {
  let res;
  try{
    res = await userRepo.logout(userIdx);
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
    res = await userRepo.forceLogout(token);
  }catch(err){
    winston.error(`Unable to forceLogout[service] :`, err);
    throw new Error('DB_FORCE_LOGOUT');
  }
  return res;
}

const getUser =  async (where, limit, offset) => {
  let res;
  try{
    res = await userRepo.getUser(where, limit, offset);
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