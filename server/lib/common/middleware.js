// const jwt = require('jsonwebtoken');

const jwtUtils = require('../common/jwt');
const userService = require('../../service/user');

//검증할 때 토큰이 유효한지 + 저장된 토큰과 일치한지도 확인

//1차로 unvalid -> 2차로는 expired
//이중 로그인시 force login 던져주기
const validateToken = async (req, res, next) => {
    let token = req.headers.authorization;
    // token = token.replace("Bearer ",  "");
    if(!token){
        res.send({message : 'need token'});
        return;
    }

    let userData;
    userData = await jwtUtils.verify(token);
    if(userData === 'accesstoken expired'){
        console.log('accesstoken 비정상적인 토큰');
        res.status(401).send({message : 'unvalid accesstoken'});
        return;
    }

    let dataToken = await userService.getUserToken(userData.userIdx);
    if(token !== dataToken){
        await userService.forceLogout(token);
        res.send({message : 'force logout'});
        return;
    }else {
        req.userData = userData;
        next();
    }
}

const refreshToken = async (req, res, next) => {
    let refreshToken = req.headers.refreshtoken;
    let accessToken = req.headers.accesstoken;
    // refreshToken = refreshToken.replace("Bearer ",  "");
    const result = await jwtUtils.refreshVerify(refreshToken, accessToken);
    if(result === 'jwt expired'){
        await userService.forceLogout(token);
        res.send({message : 'expired token'});
        return;
    }
    //새로운 accessToken을 update
    try {
        await userService.updateUserToken(result.accessToken, result.userIdx);
    }catch(err){
        if(err.message){
            throw new Error(err.message);
        }else {
            winston.error(`Middleware refresh : unable to updateUserToken :`, err);
            throw new Error('UNABLE_UPDATE_USERTOKEN');
        }
    }
    res.send(result.accessToken);
    return;
}



module.exports = {
    validateToken,
    refreshToken,
};