import gql from 'graphql-tag';

const signIn = gql`
    mutation signIn($input: LoginInputDTO!){
        signIn(input: $input){
            token,
            refreshToken
        }
    }
`;
const checkId =  gql`
    mutation checkId($id: String!){
        checkId(id: $id){
            isSuccess
        }
    }
`;
const checkNickName =  gql`
    mutation checkNickName($nickName: String!){
        checkNickName(nickName: $nickName){
            isSuccess
        }
    }
`;
const checkEmail =  gql`
    mutation checkEmail($email: String!){
        checkEmail(email: $email){
            isSuccess
        }
    }
`;
const sendMail =  gql`
    mutation sendMail($email: String!){
        sendMail(email: $email){
            isSuccess
        }
    }
`;
const checkAuth =  gql`
    mutation checkAuth($input: AuthDTO!){
        checkAuth(input: $input){
            isSuccess
        }
    }
`;
const signUp =  gql`
    mutation signUp($input: SignUpUserDTO!){
        signUp(input: $input){
            userIdx
        }
    }
`;
const sendIdMail =  gql`
    mutation sendIdMail($email: String!){
        sendIdMail(email: $email){
            isSuccess
        }
    }
`;
const sendPwMail =  gql`
    mutation sendPwMail($email: String!, $id: String!){
        sendPwMail(email: $email, id: $id){
            isSuccess
        }
    }
`;
const updatePw =  gql`
    mutation updatePw($input: UpdateUserPwDTO!){
        updatePw(input: $input){
            userIdx
        }
    }
`;
const getUserData = gql`
    query getUserData($token: String!){
        getUserData(token: $token){
            userIdx
            nickName
            email
            created 
            role
        }
    }
`;

// auth part
const issueAccessToken =  gql`
    mutation issueAccessToken($refreshToken: String!){
        issueAccessToken(refreshToken: $refreshToken){
            token
        }
    }
`;
const updateUserRole =  gql`
    mutation updateUserRole($input: UpdateUserRoleDTO!){
        updateUserRole(input: $input){
            userIdx,
            role
        }
    }
`;


export default {
    signIn, checkId, checkNickName, checkEmail,
    sendMail, checkAuth, signUp, sendIdMail,
    sendPwMail, updatePw, getUserData, issueAccessToken,
    updateUserRole
}
