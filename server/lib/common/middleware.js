const jwt = require('jsonwebtoken');

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
        // res.send({data : 1});
    }catch(err){
        res.send({message : 'unvalid token'});
        return;
    }
    req.userData = userData;
    next();
}

// front index에서 토큰이 유효한지에 대한 검사
const verifyToken = async (req, res) => {
    let token = req.headers.authorization;
    let userData;

    if(!token){
        res.send({message : 'need token'});
        return;
    }
    token = token.replace("Bearer ",  "");
    try{
        userData = jwt.verify(token, 'shhhhh');
        res.send({data : 1});
    }catch(err){
        res.send({message : 'unvalid token'});
        return;
    }
}

module.exports = {
    validateToken,
    verifyToken
};