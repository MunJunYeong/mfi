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
const temp = async (id) => {
    let res;
    try{
        res= await apolloClient.mutate({
            
        })
    }catch(err){

    }
    return res;
}

export default {
    signIn, checkId, checkNickName
}