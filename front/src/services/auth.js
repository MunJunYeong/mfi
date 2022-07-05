import axios from "axios";
const { VUE_APP_BACKEND_HOST } = process.env;

const getUserList = async (data, token)=> {
    let res;
    let where = `page=+${data.page}`;
    if(data.nickName !== ''){
        where += `&nickName=${data.nickName}`
    }
    try{
        res = await axios.get( VUE_APP_BACKEND_HOST + `/user?${where}`,{
            headers : {
                'Authorization' : token
            }
        })
    }catch(err){
        console.log(err);
    }
    return res;
}
const changeUserRole = async (data, token)=> {
    let res;
    try{
        res = await axios.put( VUE_APP_BACKEND_HOST + '/user',{
            role : data.role,
            userIdx : data.userIdx
        },
        {
            headers : {
                'Authorization' : token
            }
        })
    }catch(err){
        console.log(err);
    }
    return res;
}
const logout = async (userIdx)=> {
    let res;
    try{
        res = await axios.put(VUE_APP_BACKEND_HOST + '/logout', {
            userIdx : userIdx
        })
    }catch(err){
        console.log(err)
    }
    return res;
}
const refreshToken = async (token)=> {
    let renewToken;
    try {
        renewToken = await axios.get(VUE_APP_BACKEND_HOST + '/refresh', {
            headers : {
                AccessToken : token.accessToken,
                RefreshToken : token.refreshToken,
            }
        })
    }catch(err){
        console.log(err)
    }
    return renewToken;
}


export default{
    getUserList, changeUserRole,
    logout,
    refreshToken
 }