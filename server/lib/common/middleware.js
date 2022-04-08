const jwt = require('jsonwebtoken');

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
    
    try{
        userData = jwt.verify(token, 'shhhhh');
    }catch(err){
        console.log('validate 비정상적인 토큰')
        userService.forceLogout(token);
        res.send({message : 'unvalid token'});
        return;
    }
    
    let dataToken = await userService.getUserToken(userData.userIdx);
    if(token !== dataToken){
        userService.forceLogout(token);
        res.send({message : 'force logout'});
        return;
    }else {
        req.userData = userData;
        next();
    }


    
}



// front index에서 토큰이 유효한지에 대한 검사
// logout 일때는 유효한 토큰이고, 유효한 토큰이 아닐 시에는
// const verifyToken = async (req, res) => {
//     let token = req.headers.authorization;
//     let userData;

//     if(!token){
//         res.send({message : 'need token'});
//         return;
//     }
//     token = token.replace("Bearer ",  "");
//     try{
//         userData = jwt.verify(token, 'shhhhh');
//     }catch(err){
//         console.log('verify 비정상적인 토큰')
//         userService.forceLogout(token);
//         res.send({message : 'unvalid token'});
//         return;
//     }
    
//     let dataToken = await userService.getUserToken(userData.userIdx);
    
//     if(token !== dataToken){
//         await res.send({message : 'force logout'});
//         return;
//     }else {
//         res.send({data : 1});
//     }
// }

module.exports = {
    validateToken,
    // verifyToken
};