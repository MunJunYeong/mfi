const jwt = require('jsonwebtoken');
const { Module } = require('module');

const validateToken = async (req, res, next) => {
    let token = req.headers.authorization;
    let userData;

    if(!token){
        res.send({message : 'need token'});
        return;
    }
    token = token.replace("Bearer ", "");

    try{
        userData = jwt.verify(token, 'shhhhh');
    }catch(err){
        res.send({message : 'unvalid token'});
        return;
    }
    req.userData = userData;

    next();
}

module.exports = {validateToken};