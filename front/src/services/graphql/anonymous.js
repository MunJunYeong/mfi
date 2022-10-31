import {apolloClient} from '../../lib/graphql/apollo';
import graphqlQuery from '../../lib/graphql/queries';


const signIn = async (input)=> {
    let res;
    try{
        res = await apolloClient().mutate({
            mutation : graphqlQuery.signIn,
            variables : {
                input
            }
        })
    }catch(err){
        const errMessage = err.graphQLErrors[0].message;
        throw new Error(errMessage);
    }
    return res;
}

const checkId = async (id) => {
    let res;
    try{
        res= await apolloClient().mutate({
            mutation : graphqlQuery.checkId,
            variables : {
                id
            }
        })
    }catch(err){
        const errMessage = err.graphQLErrors[0].message;
        throw new Error(errMessage);
    }
    return res;
}

const checkNickName = async (nickName) => {
    let res;
    try{
        res= await apolloClient().mutate({
            mutation : graphqlQuery.checkNickName,
            variables : {
                nickName
            }
        })
    }catch(err){
        const errMessage = err.graphQLErrors[0].message;
        throw new Error(errMessage);
    }
    return res;
}
const checkEmail = async (email) => {
    let res;
    try{
        res= await apolloClient().mutate({
            mutation : graphqlQuery.checkEmail,
            variables : {
                email
            }
        })
    }catch(err){
        const errMessage = err.graphQLErrors[0].message;
        throw new Error(errMessage);
    }
    return res;
}
const sendMail = async (email) => {
    let res;
    try{
        res= await apolloClient().mutate({
            mutation : graphqlQuery.sendMail,
            variables : {
                email
            }
        })
    }catch(err){
        const errMessage = err.graphQLErrors[0].message;
        throw new Error(errMessage);
    }
    return res;
}
const checkAuth = async (input) => {
    let res;
    try{
        res= await apolloClient().mutate({
            mutation : graphqlQuery.checkAuth,
            variables : {
                input
            }
        })
    }catch(err){
        const errMessage = err.graphQLErrors[0].message;
        throw new Error(errMessage);
    }
    return res;
}
const signUp = async (input) => {
    let res;
    try{
        res= await apolloClient().mutate({
            mutation : graphqlQuery.signUp,
            variables : {
                input
            }
        })
    }catch(err){
        const errMessage = err.graphQLErrors[0].message;
        throw new Error(errMessage);
    }
    return res;
}
const sendIdMail = async (email) => {
    let res;
    try{
        res= await apolloClient().mutate({
            mutation : graphqlQuery.sendIdMail,
            variables : {
                email
            }
        })
    }catch(err){
        const errMessage = err.graphQLErrors[0].message;
        throw new Error(errMessage);
    }
    return res;
}
const sendPwMail = async (email, id) => {
    let res;
    try{
        res= await apolloClient().mutate({
            mutation : graphqlQuery.sendPwMail,
            variables : {
                email, id
            }
        })
    }catch(err){
        const errMessage = err.graphQLErrors[0].message;
        throw new Error(errMessage);
    }
    return res;
}
const updatePw = async (input) => {
    let res;
    try{
        res= await apolloClient().mutate({
            mutation : graphqlQuery.updatePw,
            variables : {
                input
            }
        })
    }catch(err){
        const errMessage = err.graphQLErrors[0].message;
        throw new Error(errMessage);
    }
    console.log(res);
    return res;
}

//getUserData 부분에서 parameter를 제거해야되는데 제거하면 돌아가지를 않음.
const getUserData = async (token) => {
    let res;
    try{
        res= await apolloClient().query({
            query : graphqlQuery.getUserData,
            context : {
                headers : {
                    Authorization : token
                }
            },
            variables : {
                token
            }
        })
    }catch(err){
        const errMessage = err.graphQLErrors[0].message;
        throw new Error(errMessage);
    }
    return res;
}

export default {
    signIn, checkId, checkNickName, checkEmail,
    sendMail, checkAuth, signUp, sendIdMail,
    sendPwMail, updatePw, getUserData
}