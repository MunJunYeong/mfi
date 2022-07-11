const { VUE_APP_BACKEND_HOST } = process.env;
import axios from "../lib/axios";

const getUserData = async (userIdx, token)=> {
    let res;
    try{
        res = await axios.get(VUE_APP_BACKEND_HOST + `/user/${userIdx}`, {
            headers : {
                'Authorization' : token
            }
        })
    }catch(err){
        console.log(err);
    }
    return res;
}
const checkId = async(id)=> {
    let res;
    try {
        res = await axios.post( VUE_APP_BACKEND_HOST + '/checkid', {
            id : id,
        });
    } catch (err) {
        console.log(err);
    }
    return res;
}
const checkNickName = async(nickName)=> {
    let res;
    try {
        res = await axios.post( VUE_APP_BACKEND_HOST + '/checknickname', {
            nickName : nickName,
        });
    } catch (err) {
        console.log(err);
    }
    return res;
}
const sendEmail = async(email)=> {
    let res;
    try {
        res = await axios.post( VUE_APP_BACKEND_HOST + '/sendemail', {
            email : email,
        });
    } catch (err) {
        console.log(err);
    }
    return res;
}
const checkAuthEmail = async(email, no)=> {
    let res;
    try {
        res = await axios.post( VUE_APP_BACKEND_HOST + '/checkemail', {
            email : email,
            no : no
        });
    } catch (err) {
        console.log(err);
    }
    return res;
}
const signUp = async(id, pw, nickName, email)=> {
    let res;
    try {
        res = await axios.post( VUE_APP_BACKEND_HOST + '/signup', {
            id : id,
            pw : pw,
            nickName : nickName,
            email : email
        });
    } catch (err) {
        console.log(err);
    }
    return res;
}

const login = async (data)=> {
    let res;
    try {
        res = await axios.post( VUE_APP_BACKEND_HOST + '/signin', {
            id : data.id,
            pw : data.pw,
            accessToken : data.accessToken,
            refreshToken : data.refreshToken,
        });
    } catch (err) {
        console.log(err);
    }
    return res;
}
const forceLogin  = async (data)=> {
    let res;
    try {
        res = await axios.post( VUE_APP_BACKEND_HOST + '/forcesignin', {
            id : data.id,
            pw : data.pw
        });
    } catch (err) {
        console.log(err);
    }    
    return res;
}
const findIdSendEmail = async (data)=> {
    let res;
    try {
        res = await axios.post(VUE_APP_BACKEND_HOST + '/findid', {
            email : data.email,
        })
    }catch(err) {
        console.log(err);
    }
    return res;
}
const findPwSendEmail = async (data)=> {
    let res;
    try {
        res = await axios.post(VUE_APP_BACKEND_HOST + '/findpw', {
            id : data.id,
            email : data.email,
        })
    }catch(err) {
        console.log(err);
    }    
    return res;
}
const findPwCheckEmail = async (data)=> {
    let res;
    try {
        res = await axios.post(VUE_APP_BACKEND_HOST + '/checkemail', {
            email : data.email,
            no : data.no,
        })
    }catch(err) {
        console.log(err);
    }
    return res;
}
const updatePw = async (data)=> {
    let res;
    try {
        res = await axios.put(VUE_APP_BACKEND_HOST + '/updatepw', {
            email : data.email,
            pw : data.pw,
            id : data.id
        })
    }catch(err) {
        console.log(err);
    }
    return res;
}

const naverLogin = async()=> {
    let res;
    const client_id = 'F3CEZShVnOqQAoKzfili';
    const redirect_uri = 'http://127.0.0.1:8080/signin/naver';
    const state = '';
    const secret = '64VA9sC5Kj';
    try{
        console.log('1111');
        // res =await axios.get(`https://nid.naver.com/oauth2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&state=`);

    }catch(err){
        console.log(err);
    }
    console.log(res)
}

export default{
    checkId, checkNickName, sendEmail,checkAuthEmail, signUp,
    getUserData, login, forceLogin, findIdSendEmail,
    findPwSendEmail, findPwCheckEmail, updatePw, naverLogin
}
