import axios from "@/lib/axios.js";
const { VUE_APP_BACKEND_HOST } = process.env;

const getIdea = async (data)=> {
    let res;
    let baseUrl = VUE_APP_BACKEND_HOST +'/idea?page='+data.page;
    if(data.subject) {
        baseUrl += `&subject=${data.subject}`
    }
    try{
        res = await axios.get( baseUrl , {
            params: {
                role : data.role,
                order : data.order,
                userIdx : data.userData.userIdx,
                userRole : data.userData.role,
            }
        });
    }catch(err){
        console.log(err);
        return;
    }
    return res;
}

const getMyIdea = async (data, token)=> {
    let res;
    let where = `page=${data.page}&userIdx=${data.userIdx}`
    if(data.subject !== ''){
        where += `&subject=${data.subject}`
    }
    try{
        res = await axios.get(VUE_APP_BACKEND_HOST +`/info/idea?${where}`,{
            headers : {
                'Authorization' : token
            }
        });
    }catch(err){
        console.log(err);
        return;
    }

    return res;
}
const getAdminUserIdea = async (data, token)=> {
    let res;
    let where = `page=${data.page}`
    if(data.subject !== undefined){
        where += `&subject=${data.subject}`
    }
    try{
        res = await axios.get(VUE_APP_BACKEND_HOST +`/user/${data.userIdx}/idea?${where}`,{
            headers : {
                'Authorization' : token
            }
        });
    }catch(err){
        console.log(err);
        return;
    }
    return res;
}
const getClickIdea  = async (data, token)=> {
    let res;
    try {
        res = await axios.get(VUE_APP_BACKEND_HOST +`/idea/${data.ideaIdx}`, 
        {
            headers : {
                'Authorization' : token
            }
        });
    }catch(err){
        console.log(err);
        return;
    }
    return res;
}
const addIdea = async (data, token)=> {
    let res;
    try {
        res = await axios.post(VUE_APP_BACKEND_HOST +'/idea',{
            subject : data.subject,
            content : data.content,
        },
        {
            headers : {
                'Authorization' : token
            }
        });
    }catch(err){
        console.log(err)
    }
    return res;
}
const modifyIdea = async (data, token)=> {
    let res;
    try{
        res = await axios.put(VUE_APP_BACKEND_HOST +'/idea/:ideaIdx', 
        {
            params : {
                ideaIdx : data.ideaIdx,
                subject : data.subject,
                content : data.content
            }
        },
        {
            headers : {
                'Authorization' : token
            }
        })
    }catch(err){
        alert('통신오류');
        return;
    }
    return res;
}
const getComment = async (ideaIdx, token)=> {
    let res;
    try {
        res = await axios.get(VUE_APP_BACKEND_HOST +'/comment?ideaIdx='+ ideaIdx.ideaIdx, {
            headers : {
                'Authorization' : token
            }
        });
    }catch(err){
        console.log(err)
        return;
    }
    return res;
}
const deleteIdea = async (data, token)=> {
    try{
        await axios.delete(VUE_APP_BACKEND_HOST +'/idea?ideaIdx='+ data.ideaIdx,
        {
            headers : {
                'Authorization' : token
            }
        });
    }catch(err){
        console.log(err);
        return;
    }
}
const addComment  = async (data, token)=> {
    let res;
    try {
        res = await axios.post(VUE_APP_BACKEND_HOST +'/comment', 
        {
            comment : data.comment,
            ideaIdx : data.ideaIdx
        },
        {
            headers : {
                'Authorization' : token
            }
        });
    }catch(err){
        console.log(err);
        return;
    }
    return res;
}
// const  = async ()=> {
    
//     return res;
// }

export default{
    getIdea,
    getMyIdea,
    getAdminUserIdea,
    getClickIdea,
    addIdea,
    modifyIdea,
    getComment,
    deleteIdea,
    addComment
 }