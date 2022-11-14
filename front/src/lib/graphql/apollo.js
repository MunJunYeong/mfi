//apollo 적용
import ApolloClient from 'apollo-boost';
// import { ApolloLink } from 'apollo-boost';
import VueApollo from 'vue-apollo';
import { reIssueToken } from './interceptor';
import { typeDefs } from './resolver'

const { VUE_APP_USER_BACKEND_HOST } = process.env;
let _apolloClient;

const init = () =>{
    if(_apolloClient) return _apolloClient;

    _apolloClient = new ApolloClient({
        uri: VUE_APP_USER_BACKEND_HOST,
        typeDefs,
        resolvers : {},
        onError: (error) => {
            if(error.graphQLErrors[0].message === 'accessToken expired'){
                reIssueToken(error);
            }
            // 다른 경우에는 강제로 로그인 시켜버리기
        },
        // request:(operation) => {
        //     operation.setContext({ start: new Date() });
        //     console.log(operation);            
        // },
    })

    const apolloProvider = new VueApollo({
        defaultClient: apolloClient,
    })
    
    apolloProvider.provide();

    return _apolloClient;
}

const apolloClient = () => {
    if(_apolloClient) return _apolloClient;
    const client = init();
    return client
}


export  {
    apolloClient,
    init,
}