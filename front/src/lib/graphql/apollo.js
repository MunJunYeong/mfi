//apollo 적용
import ApolloClient from 'apollo-boost';
import { ApolloLink } from 'apollo-boost';
import VueApollo from 'vue-apollo';
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
            console.log(error);
            console.log(1111);
        },
        request:(operation) => {
                    operation.setContext({ start: new Date() });
                    console.log(operation);            
                },
        
        
    })

    // const timeStartLink = new ApolloLink((operation, forward) => {
    //     operation.setContext({ start: new Date() });
    //     console.log(11111);
    //     return forward(operation);
    //   });

    const test = new ApolloLink((operation, forward) => {
        operation.setContext({ start: new Date() });
        console.log(222222);
        return forward(operation);
    });

    console.log(test);
        
    

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