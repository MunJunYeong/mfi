const jwt = require('jsonwebtoken');
const redisClient = require('./redis');
const secret = process.env.SECRET;

const sign = (user) => {
    const payload = {
        ...user
    };
    return jwt.sign(payload, secret, {
        algorithm: 'HS256', // 암호화 알고리즘
        expiresIn: '5s', 	  // 유효기간
    })
}

const verify = async (token) => {
    let userData = null;
    try {
        userData= jwt.verify(token, secret);
        return {
            ...userData
        }
    }catch(err){
        return err.message
    }
}

const refresh = ()=> {
    return jwt.sign({}, secret, { // refresh token은 payload 없이 발급
        algorithm: 'HS256',
        expiresIn: '14d',
      });
}

const refreshVerify = async ()=> {

}

module.exports = {
    sign,
    verify,
    refresh,
    refreshVerify,
}