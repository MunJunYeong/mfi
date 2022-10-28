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

export default {
    signIn, checkId, checkNickName, checkEmail,
    sendMail, checkAuth, signUp
}
