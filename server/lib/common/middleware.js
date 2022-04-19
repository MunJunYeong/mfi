// const jwt = require('jsonwebtoken');

const jwtUtils = require('../common/jwt');
const userService = require('../../service/user');

//검증할 때 토큰이 유효한지 + 저장된 토큰과 일치한지도 확인

const validateToken = async (req, res, next) => {
    let token = req.headers.authorization;
    let userData;
    if(!token){
        res.send({message : 'need token'});
        return;
    }
    token = token.replace("Bearer ",  "");
    userData = await jwtUtils.verify(token);

    if(userData === 'jwt expired'){
        console.log('validate 비정상적인 토큰')
        await userService.forceLogout(token);
        res.send({message : 'unvalid token'});
        return;
    }

    let dataToken = await userService.getUserToken(userData.userIdx);
    if(token !== dataToken){
        userService.forceLogout(token);
        res.send({message : 'force logout'});
        return;
    }else {
        if(req.headers.verify ==='verify'){
            res.send({data:1})
        }else {
            req.userData = userData;
            next();
        }
        
    }


    
}



module.exports = {
    validateToken,
    // verifyToken
};