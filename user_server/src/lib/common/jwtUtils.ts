import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
const secret = process.env.SECRET;

const sign = (user) => {
    const payload = {
        ...user
    };
    return jwt.sign(payload, secret, {
        algorithm: 'HS256', // 암호화 알고리즘
        expiresIn: '2h', 	  // 유효기간
    })
}

const verify = (token) => {
    let userData = null;
    if(token === null) return 'need token';
    try {
        userData= jwt.verify(token, secret);
        return {
            ...userData
        }
    }catch(err){
        return 'accesstoken expired'
    }
}

export default{
    sign, verify
}