const { GraphQLClient, gql } = require('graphql-request');

const makeGraphqlClient = (token)=> {
    const graphQLClient = new GraphQLClient(process.env.LOCAL_AUTH_SERVER, {
        headers: {
            authorization: token,
        },
    })
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