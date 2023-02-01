import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { 
    ApolloClient,
    HttpLink, 
    InMemoryCache, 
    ApolloProvider,
    gql,
} from '@apollo/client'

import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('library-token')
    return{
        headers:{
            ...headers,
            authorization: token ? `bearer ${token}` : null,
        }
    }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000/', })
const client = new ApolloClient ({
    cache: new InMemoryCache({
        addTypename: false
    }),
    link: authLink.concat(httpLink),
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
<ApolloProvider client={client}>
<App />
</ApolloProvider>
)
