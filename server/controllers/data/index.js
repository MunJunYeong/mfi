const winston = require('../../lib/common/winston');
const {user : userService} = require('../../service');



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

module.exports = {
    getuserData
}