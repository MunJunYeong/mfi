const { GraphQLClient, gql } = require('graphql-request');

const makeGraphqlClient = ()=> {
    const graphQLClient = new GraphQLClient(process.env.LOCAL_AUTH_SERVER, {
        
    })
    console.log(graphQLClient.setHeader('authorization','111'));
    console.log(graphQLClient);
    return  graphQLClient;
}

const getUserDataQuery = (token) => {
    const query = gql`
        {
            getUserData(token : "${token}"){
                userIdx
                id
                nickName
            }
        }
    `
    return query;
  }




module.exports = {
    makeGraphqlClient, getUserDataQuery
}