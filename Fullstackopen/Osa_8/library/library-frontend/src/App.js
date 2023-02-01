import { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'

import { ALL_BOOKS } from './queries'
import { ALL_AUTHORS } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null) 
  const [errorMessage, setErrorMessage] = useState(null)
  
  const booksData = useQuery(ALL_BOOKS)
  const authorsData = useQuery(ALL_AUTHORS)
  const client = useApolloClient()
  
  console.log(booksData)
  console.log(authorsData)
  
  if(booksData.loading || authorsData.loading){
    return(
      <div>
        Loading....
      </div>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000 )
  }

  if(!token){
    return(
      <>
        <Notify errorMessage={errorMessage} />
        <button onClick ={() => setPage('login')}>login</button>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <LoginForm setToken = {setToken} setErrorMessage = {notify} show={ page === 'login'}/>
        <Authors data = {authorsData.data.allAuthors} show={page ==='authors'}/>
        <Books data = {booksData.data.allBooks} show = {page === 'books'} />
      </>
    )
  }
  
  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books') }>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => logout()}>logout</button>
      </div>
      <Authors data = {authorsData.data.allAuthors}show={page === 'authors'} />
      <Books data = {booksData.data.allBooks} show={page === 'books'} />
      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
