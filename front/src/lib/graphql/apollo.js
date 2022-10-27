//apollo 적용
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import { typeDefs } from './resolver'

const apolloClient = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    typeDefs,
    resolvers : {},
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

apolloProvider.provide();

export  {
    apolloClient
}