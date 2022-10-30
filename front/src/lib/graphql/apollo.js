//apollo 적용
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import { typeDefs } from './resolver'

let _apolloClient;

const init = () =>{
    if(_apolloClient) return _apolloClient;

    _apolloClient = new ApolloClient({
        uri: 'http://localhost:3000/graphql',
        typeDefs,
        resolvers : {},
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