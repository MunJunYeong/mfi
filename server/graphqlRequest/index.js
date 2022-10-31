const { GraphQLClient, gql } = require('graphql-request');

const makeGraphqlClient = ()=> {
    const graphQLClient = new GraphQLClient(process.env.LOCAL_AUTH_SERVER, {
    })
    return  graphQLClient;
}

const middlewareQuery = (token) => {
    const query = gql`
        {
            validateToken(token : "${token}"){
                isSuccess
            }
        }
    `
    return query;
  }




module.exports = {
    makeGraphqlClient, middlewareQuery
}