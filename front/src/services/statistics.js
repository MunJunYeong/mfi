import axios from "../lib/axios/index";
const { VUE_APP_BACKEND_HOST } = process.env;

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

export default {
    createVisitor, getNews, getUserCount, 
    getIdeaCount, getTodayVisitor, getTotalVisitor, 
}