import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { appendAnecdote, setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=> {
    anecdoteService
    .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  })

  return (
      <div>
        <Notification/>
        <AnecdoteList/>
        <AnecdoteForm/>
      </div>
  )
}

export default App