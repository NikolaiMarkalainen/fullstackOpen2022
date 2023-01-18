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

const query = gql`
query{
    allBooks {
        title,
        author,
        genres,
        published,
        id
    }
}
`


const client = new ApolloClient ({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:4000/',
    }),
})

client.query({ query }).then((response => {
    console.log(response.data)
}))
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
<ApolloProvider client={client}>
<App />
</ApolloProvider>
)
