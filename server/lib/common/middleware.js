// const jwt = require('jsonwebtoken');

const jwtUtils = require('../common/jwt');
const userService = require('../../service/user');
const {makeGraphqlClient, getUserDataQuery} = require('../../graphqlRequest');
const { gql } = require('graphql-request');



// const getUserData = (userIdx) => {
//     const query = gql`
//       {
//         getUserData(userIdx : ${userIdx}){    
//               userIdx
//               id
//               nickName
            
//           }
//       }
//     `
//     return query
//   }
  
  
//   graphQLClient.request(getUserData(30)).then((data) => console.log(data)).catch((err) => {
//     console.log(1111111);
//     console.log(err);
//   });

//검증할 때 토큰이 유효한지 + 저장된 토큰과 일치한지도 확인

const validateToken = async (req, res, next) => {
    let token = req.headers.authorization;

    if(!token){
        res.send({message : 'need token'});
        return;
    }
    let userData;
    // userData = await jwtUtils.verify(token);
    const graphqlClient = makeGraphqlClient(token);
    try{
        userData = await graphqlClient.request(getUserDataQuery(token));
    }catch(err){
        res.status(401).send({message : 'unvalid accesstoken'}); return;
    }
    userData = userData.getUserData;
    req.userData = userData;
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