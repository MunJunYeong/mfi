const {user : userService} = require('../../service');
const winston = require('../../lib/common/winston');
const pagination = require('../../lib/common/pagination');

const updateUserRole = async (req, res) => {
    const data = req.body;
    
    if(!data.role || !data.userIdx) throw new Error('WRONG_ACCESS');
    let result;
    try{
        result = await userService.updateRole(data.role, data.userIdx);
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.warn(`Controller updateUserRole Error :`, err);
        throw new Error('CONTROLLER_UPDATE_USER_ROLE');
    }
    res.send(result)
}

const getuserData = async(req, res) => {
    const userIdx = req.params.userIdx;
    if(!userIdx) throw new Error('WRONG_ACCESS');
    let data;
    try{
        data = await userService.getUserData(userIdx);
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.warn(`Controller getuserData Error :`, err);
        throw new Error('CONTROLLER_GET_USER_DATA');
    }
    res.send({data : data});
}
const getUser = async (req, res)=> {
    const {page, nickName} = req.query;
    const {limit, offset} = pagination.getPagination(page);
    let data
    try{
        data = await userService.getUser(page, nickName, limit, offset);
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.warn(`Controller getUser Error :`, err);
        throw new Error('CONTROLLER_GET_USER');
    }
    const result = pagination.getPagingUserData(data, page, limit);
    res.send(result);
}


module.exports = {
    getuserData,
    updateUserRole,
    getUser,
}