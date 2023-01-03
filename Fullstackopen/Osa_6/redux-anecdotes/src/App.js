import { useSelector, useDispatch } from 'react-redux'
import NewAnecdote from './components/NewAnecdote'
import Anecdotes from './components/Anecdote'
const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  return (
      <div>
        <Anecdotes/>
        <NewAnecdote/>
      </div>
  )
}

export default App