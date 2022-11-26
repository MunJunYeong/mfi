import { apolloClient } from "./apollo";
import { reIssueToken } from "./reIssueToken";

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



addIntercpeter('retryqury', retryQuery);

const intercepterList = {

};

const addIntercpeter = (funcName, func) => {
    intercepterList[funcName] = func;
}

const removeInter = (funcName) => {
    delete intercepterList[funcName];
}

const resHookList = {

};

const addresHook = (funcName, func) => {
    resHookList[funcName] = func;
}

const removeresHook = (funcName) => {
    delete resHookList[funcName];
}



const query = (query) => {

    const afterInterQuery = Object.keys(intercepterList).reduce((queryTarget, key) => {
        const next = intercepterList[key](queryTarget);
        return next;
    }, query)


    const res = apolloClient.query(afterInterQuery);

    Object.keys(intercepterList).reduce((originRes, key) => {
        const nextRes = intercepterList[key](originRes);
        return nextRes;
    }, res)

    return res;
    


}

const mutate = () => {

}



export  {
    apolloQuery,
    apolloMutation
}