import {apolloClient} from '../../lib/graphql/apollo';
import graphqlQuery from '../../lib/graphql/queries';


const signIn = async (input)=> {
    let res;
    try{
        res = await apolloClient.mutate({
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
        res= await apolloClient.mutate({
            mutation : graphqlQuery.checkId,
            variables : {
                id
            }
        })
    }catch(err){
        console.log(err);
    }
    return res;
}

const checkNickName = async (nickName) => {
    let res;
    try{
        res= await apolloClient.mutate({
            mutation : graphqlQuery.checkNickName,
            variables : {
                nickName
            }
        })
    }catch(err){

    }
    return res;
}
const checkEmail = async (email) => {
    let res;
    try{
        res= await apolloClient.mutate({
            mutation : graphqlQuery.checkEmail,
            variables : {
                email
            }
        })
    }catch(err){

    }
    return res;
}
const sendMail = async (email) => {
    let res;
    try{
        res= await apolloClient.mutate({
            mutation : graphqlQuery.sendMail,
            variables : {
                email
            }
        })
    }catch(err){

    }
    return res;
}
const checkAuth = async (input) => {
    let res;
    try{
        res= await apolloClient.mutate({
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
        res= await apolloClient.mutate({
            mutation : graphqlQuery.signUp,
            variables : {
                input
            }
        })
    }catch(err){

    }
    return res;
}
const temp = async (id) => {
    let res;
    try{
        res= await apolloClient.mutate({
            mutation : graphqlQuery,
            variables : {
                id
            }
        })
    }catch(err){

    }
    return res;
}

export default {
    signIn, checkId, checkNickName, checkEmail,
    sendMail, checkAuth, signUp
}