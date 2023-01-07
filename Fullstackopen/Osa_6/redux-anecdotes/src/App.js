import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { appendAnecdote, initializeAnecdotes, setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
      <div>
        <Notification/>
        <AnecdoteList/>
        <AnecdoteForm/>
      </div>
  )
}

export default App