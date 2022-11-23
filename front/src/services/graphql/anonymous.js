import graphqlQuery from '../../lib/graphql/queries';
import { apolloQuery, apolloMutation } from '../../lib/graphql/interceptors';

const signIn = async (input)=> {
    let res;
    try{
        const query = {
            mutation : graphqlQuery.signIn,
            variables : {
                input
            }
        }
        res = await apolloMutation(query);
    }catch(err){
        throw new Error(err.message);
    }
    return res;
}

const checkId = async (id) => {
    let res;
    try{
        const query = {
            mutation : graphqlQuery.checkId,
            variables : {
                id
            }
        }
        res = await apolloMutation(query);
    }catch(err){
        throw new Error(err.message);
    }
    return res;
}

const checkNickName = async (nickName) => {
    let res;
    try{
        const query = {
            mutation : graphqlQuery.checkNickName,
            variables : {
                nickName
            }
        }
        res = await apolloMutation(query);
    }catch(err){
        throw new Error(err.message);
    }
    return res;
}
const checkEmail = async (email) => {
    let res;
    try{
        const query = {
            mutation : graphqlQuery.checkEmail,
            variables : {
                email
            }
        }
        res = await apolloMutation(query);
    }catch(err){
        throw new Error(err.message);
    }
    return res;
}
const sendMail = async (email) => {
    let res;
    try{
        const query = {
            mutation : graphqlQuery.sendMail,
            variables : {
                email
            }
        }
        res = await apolloMutation(query);
    }catch(err){
        throw new Error(err.message);
    }
    return res;
}
const checkAuth = async (input) => {
    let res;
    try{
        const query = {
            mutation : graphqlQuery.checkAuth,
            variables : {
                input
            }
        }
        res = await apolloMutation(query);
        
    }catch(err){
        throw new Error(err.message);
    }
    return res;
}
const signUp = async (input) => {
    let res;
    try{
        const query = {
            mutation : graphqlQuery.signUp,
            variables : {
                input
            }
        }
        res = await apolloMutation(query);
    }catch(err){
        throw new Error(err.message);
    }
    return res;
}
const sendIdMail = async (email) => {
    let res;
    try{
        const query = {
            mutation : graphqlQuery.sendIdMail,
            variables : {
                email
            }
        }
        res = await apolloMutation(query);
    }catch(err){
        throw new Error(err.message);
    }
    return res;
}
const sendPwMail = async (email, id) => {
    let res;
    try{
        const query = {
            mutation : graphqlQuery.sendPwMail,
            variables : {
                email, id
            }
        }
        res = await apolloMutation(query);
    }catch(err){
        throw new Error(err.message);
    }
    return res;
}
const updatePw = async (input) => {
    let res;
    try{
        const query = {
            mutation : graphqlQuery.updatePw,
            variables : {
                input
            }
        }
        res = await apolloMutation(query);
    }catch(err){
        throw new Error(err.message);
    }
    console.log(res);
    return res;
}

//getUserData 부분에서 parameter를 제거해야되는데 제거하면 돌아가지를 않음.
const getUserData = async (token) => {
    let res;
    try{
        const query = {
            query : graphqlQuery.getUserData,
            context : {
                headers : {
                    Authorization : token
                }
            },
            variables : {
                token
            }
        }

        res= await apolloQuery(query);
    }catch(err){
        throw new Error(err.message);
    }
    return res;
}

export default {
    signIn, checkId, checkNickName, checkEmail,
    sendMail, checkAuth, signUp, sendIdMail,
    sendPwMail, updatePw, getUserData
}