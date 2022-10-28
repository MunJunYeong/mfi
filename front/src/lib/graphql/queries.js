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

export default {
    signIn, checkId, checkNickName
}
