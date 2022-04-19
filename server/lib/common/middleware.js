// const jwt = require('jsonwebtoken');

const jwtUtils = require('../common/jwt');
const userService = require('../../service/user');

//검증할 때 토큰이 유효한지 + 저장된 토큰과 일치한지도 확인

//1차로 unvalid -> 2차로는 expired
//이중 로그인시 force login 던져주기
const validateToken = async (req, res, next) => {

    let token = req.headers.authorization;
    // token = token.replace("Bearer ",  "");

    // refresh
    if(req.headers.verify === 'refresh'){
        let refreshToken = req.headers.refreshtoken;
        // refreshToken = refreshToken.replace("Bearer ",  "");
        const result = await jwtUtils.refreshVerify(refreshToken, token);
        console.log(result)
        if(result === 'jwt expired'){
            userService.forceLogout(token);
            res.send({message : 'expired token'});
            return;
        }
        
        try {
            await userService.updateUserToken(result.token, result.userIdx);
        }catch(err){
            if(err.message){
                throw new Error(err.message);
            }else {
                winston.error(`Middleware refresh : unable to updateUserToken :`, err);
                throw new Error('UNABLE_UPDATE_USERTOKEN');
            }
        }
        res.send({data : result.token});
        return;
    }else {

        if(!token){
            res.send({message : 'need token'});
            return;
        }

        let userData;
        userData = await jwtUtils.verify(token);
        if(userData === 'accesstoken expired'){
            console.log('accesstoken 비정상적인 토큰');
            res.send({message : 'unvalid accesstoken'});
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
    


    
}



module.exports = {
    validateToken,
    // verifyToken
};