import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { User } from 'src/user/entities/user.entity';
const secret = process.env.SECRET;

const sign =  (user: User) => {
    const payload = {
        ...user
    };
    console.log('dfasfsa')
    const temp = jwt.sign(payload, secret, {
        algorithm: 'HS256', // 암호화 알고리즘
        expiresIn: '2h', 	  // 유효기간
    })
    console.log(temp)
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
//이중
const refresh = ()=> {
    const payload = {
    };
    return jwt.sign(payload, secret, { // refresh token은 payload 없이 발급
        algorithm: 'HS256',
        expiresIn: '14d',
      });
}

export default{
    sign, verify, refresh
}