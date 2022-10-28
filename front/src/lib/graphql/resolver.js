import gql from 'graphql-tag';

const typeDefs = gql`
    type LoginTokenObj {
        token: String!
        refreshToken: String!
    }
    input LoginInputDTO {
        id: String!
        pw: String!
        isForce: Boolean!
    }
    input SignUpUserDTO {
        id: String!
        pw: String!
        nickName: String!
        email: String!
    }
    input AuthDTO {
        email: String!
        no: String!
    }
    input UpdateUserPwDTO {
        email: String!
        pw: String!
    }
    input UpdateUserRoleDTO {
        userIdx: Float!
        role: String!
    }
    input UpdateUserTokenDTO {
        userIdx: Float!
        token: String!
    }
    type IsSuccessObj {
        isSuccess: Boolean! 
    }
    type LoginTokenObj {
        token: String!
        refreshToken: String!
    }
    type UserListObj {
        userList: [User!]
        count: Float!
    }

    input GetUserListDTO {
        page: Float!
        nickName: String!
    }
`;


export {
    typeDefs
}