//apollo 적용
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import { typeDefs } from './dataType'

const { VUE_APP_USER_BACKEND_HOST } = process.env;
let _apolloClient;

const init = () =>{
    if(_apolloClient) return _apolloClient;

    _apolloClient = new ApolloClient({
        uri: VUE_APP_USER_BACKEND_HOST,
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


const apolloQuery = async (variables) => {
    let result;
    try{
        result =await  apolloClient().query(variables);
    }catch(err){
        console.log(err);
    }
    return
}



export  {
    apolloClient,
    init,
    apolloQuery,
}