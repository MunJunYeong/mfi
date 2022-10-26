import gql from 'graphql-tag';

const typeDefs = gql`
    type LoginTokenObj {
        token: String!
        refreshToken: String!
    },
    input LoginInputDTO {
        id: String!
        pw: String!
        isForce: Boolean!
    }
`;


export {
    typeDefs
}