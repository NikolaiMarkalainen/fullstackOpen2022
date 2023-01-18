import { useState } from 'react'
import { useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_BOOKS } from './queries'
import { ALL_AUTHORS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const booksData = useQuery(ALL_BOOKS)
  const authorsData = useQuery(ALL_AUTHORS)
  console.log(booksData)
  console.log(authorsData)
  if(booksData.loading || authorsData.loading){
    return(
      <div>
        Loading....
      </div>
    )
  }
  
  
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books') }>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors data = {authorsData.data.allAuthors}show={page === 'authors'} />

      <Books data = {booksData.data.allBooks} show={page === 'books'} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
