import {apolloClient} from '../../lib/graphql/apollo';
import graphqlQuery from '../../lib/graphql/queries';


const issueAccessToken = async (refreshToken) => {
    let res;
    try{
        res = await apolloClient().mutate({
            mutation : graphqlQuery.issueAccessToken,
            variables : {
                refreshToken
            }
        })
    }catch(err){
        console.log(err);
    }
    return res;
}
const updateUserRole = async (input) => {
    let res;
    console.log(input)
    try{
        res = await apolloClient().mutate({
            mutation : graphqlQuery.updateUserRole,
            variables : {
                input
            }
        })
    }catch(err){
        console.log(err);
    }
    return res;
}

export default {
    issueAccessToken, updateUserRole
}