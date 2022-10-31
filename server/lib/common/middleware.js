// const jwt = require('jsonwebtoken');

const jwtUtils = require('../common/jwt');
const userService = require('../../service/user');
const {makeGraphqlClient, middlewareQuery} = require('../../graphqlRequest');
//검증할 때 토큰이 유효한지 + 저장된 토큰과 일치한지도 확인

const validateToken = async (req, res, next) => {
    let token = req.headers.authorization;
    if(!token){
        res.send({message : 'need token'});
        return;
    }
    let isValidToken;
    const graphqlClient = makeGraphqlClient();
    try{
        isValidToken = await graphqlClient.request(middlewareQuery(token));
    }catch(err){
        console.log(err);
        res.status(401).send({message : 'unvalid accesstoken'}); return;
    }
    console.log(isValidToken)
    next();
}

const refreshToken = async (req, res, next) => {
    let refreshToken = req.headers.refreshtoken;
    let accessToken = req.headers.accesstoken;
    // refreshToken = refreshToken.replace("Bearer ",  "");
    const result = await jwtUtils.refreshVerify(refreshToken, accessToken);
    if(result === 'jwt expired'){
        await userService.forceLogout(accessToken);
        res.send({message : 'expired token'});
        return;
    }else {
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
}



module.exports = {
    validateToken,
    refreshToken,
};