import { apolloClient } from "./apollo";
import { reIssueToken } from "./reIssueToken";


const retryQuery = async (token, query) => {
    let result;
    if(query.context){
        query.context.headers.Authorization = token;
    }
    if(query.variables.token){
        query.variables.token = token;
    }
    try{
        result = await apolloClient().query(query);
    }catch(err){
        const errMessage = err.graphQLErrors[0].message;
        throw new Error(errMessage);
    }
    return result;
}
const retryMutation = async (token, query) => {
    let result;
    if(query.context){
        query.context.headers.Authorization = token;
    }
    if(query.variables.token){
        query.variables.token = token;
    }
    try{
        result = await apolloClient().mutate(query);
    }catch(err){
        const errMessage = err.graphQLErrors[0].message;
        throw new Error(errMessage);
    }
    return result;
}

const apolloQuery = async (query) => {
    let result;
    try{
        result = await apolloClient().query(query);
        console.log(result)
    }catch(err){
        const errMessage = err.graphQLErrors[0].message;
        if(errMessage === 'accessToken expired'){
            const newAccessToken = await reIssueToken();
            const reRequest = await retryQuery(newAccessToken, query);
            return reRequest;
        }else {
            throw new Error(errMessage);
        }
    }
    return result;
}


const apolloMutation = async (query)=> {
    let result;
    try{
        result = await apolloClient().mutate(query);
    }catch(err){
        const errMessage = err.graphQLErrors[0].message;
        if(errMessage === 'accessToken expired'){
            const newAccessToken = await reIssueToken();
            const reRequest = await retryMutation(newAccessToken, query);
            return reRequest;
        }else {
            throw new Error(errMessage);
        }
    }
    return result;
}



export  {
    apolloQuery,
    apolloMutation
}