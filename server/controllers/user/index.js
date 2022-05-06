
const {user : userService} = require('../../service');
const pagination = require('../../lib/common/pagination');
const {Op} = require('../../lib/db');


const testStart = async(req, res) => {
    try{
        console.log('dfasdfsafsaf')
        res.send({data: 1});

    }catch(err){
        console.log(err)
    }
}


const updateUserRole = async (req, res) => {
    const data = req.body;
    
    if(!data.role || !data.userIdx){
        throw new Error('WRONG_ACCESS');
    }

    try{
        const result = await userService.updateRole(data.role, data.userIdx);
        res.send(result)
    }catch(err){
        winston.error(`Unable to updateUserRole :`, err);
        throw new Error('UNABLE_USERROLE');
    }
}

const getuserData = async(req, res) => {
    const userIdx = req.params.userIdx;
    
    let data;
    try{
        data = await userService.getUserData(userIdx);
    }catch(err){
        winston.error(`Unable to getUserData[service] :`, err);
        throw new Error('DB_GET_USER_DATA');
    }
    res.send({data : data});
}
const getUser = async (req, res)=> {
    const {page, nickName} = req.query;
            
    const {limit, offset} = pagination.getPagination(page);
        
    let where = {};
    
    where.role = {
        [Op.ne] : 'admin'
    }
    if(nickName !== undefined){
        where.nickName = {
            [Op.like] : `%${nickName}%`
        }
    }

    try{
        const data = await userService.getUser(where, limit, offset);
        const result = pagination.getPagingUserData(data, page, limit);
        res.send(result);
    }catch(err){
        winston.error(`Unable to getUser(role:admin) :`, err);
        throw new Error('UNABLE_GET_USER');
    }

}


module.exports = {
    getuserData,
    updateUserRole,
    getUser,
    testStart
}