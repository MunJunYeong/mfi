const { VUE_APP_BACKEND_HOST } = process.env;
import axios from "../lib/axios";

const createVisitor = async()=> {
    let res;
    try{
        res = await axios.post(VUE_APP_BACKEND_HOST + '/statistics/ip', {
    
        })
    }catch(err){
        console.log(err);
    }
    return res;
}

const getNews = async ()=> {
    let res;
    try{
        res = await axios.get( VUE_APP_BACKEND_HOST + '/statistics/news', {
        })
    }catch(err){
        console.log(err);
    }
    return res;
}

const getUserCount = async ()=> {
    let res;
    try{
        res = await axios.get( VUE_APP_BACKEND_HOST + '/statistics/usercount', {
        })
    }catch(err){
        console.log(err);
    }
    return res;
}

const getIdeaCount = async ()=> {
    let res;
    try{
        res = await axios.get( VUE_APP_BACKEND_HOST + '/statistics/ideacount', {

        })
    }catch(err){
        console.log(err);
    }
    return res;
}
const getTodayVisitor = async ()=> {
    let res;
    try{
        res = await axios.get( VUE_APP_BACKEND_HOST + '/statistics/todayvisitor', {

        })
    }catch(err){
        console.log(err);
    }
    return res;
}
const getTotalVisitor = async ()=> {
    let res;
    try{
        res = await axios.get( VUE_APP_BACKEND_HOST + '/statistics/totalvisitor', {
            
        })
    }catch(err){
        console.log(err);
    }
    return res;
}
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
const login = async (data)=> {
    let res;
    console.log(data)
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


export default{
    createVisitor,
    getNews,
    getUserCount, getIdeaCount, getTodayVisitor, getTotalVisitor,
    getUserData,
    login, forceLogin,
    findIdSendEmail,
    findPwSendEmail, findPwCheckEmail, updatePw, 

 }
