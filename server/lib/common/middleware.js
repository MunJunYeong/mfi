const jwt = require('jsonwebtoken');
const {models, Op} = require('../db')

const validateToken = async (req, res, next) => {
    let token = req.headers.authorization;
    let userData;
    console.log(token)
    if(!token){
        res.send({message : 'need token'});
        return;
    }
    token = token.replace("Bearer ",  "");
    try{
        userData = jwt.verify(token, 'shhhhh');
    }catch(err){
        res.send({message : 'unvalid token'});
        return;
    }
    req.userData = userData;

    next();
}

module.exports = {
    validateToken,
};