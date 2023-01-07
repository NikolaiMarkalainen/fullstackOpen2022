import { useDispatch, useSelector } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { removeNotification,addNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"
const NewAnecdote = (props) => {
    const dispatch = useDispatch()
    const addAnecdote = async (event) => {
            event.preventDefault()
            const content = event.target.anecdote.value
            console.log(event.target.anecdote)
            event.target.anecdote.value = ''
            const newAnecdote = await anecdoteService.createNew(content)
            dispatch(createAnecdote(newAnecdote)) &&
            dispatch(addNotification(newAnecdote)) &&
            setTimeout(() => {
                dispatch(removeNotification(content))
            }, 5000)
        }
    return(
        <div>   
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <input name='anecdote' />
            <button type = "submit">create</button>
            </form>
        </div>
    )
}

export default NewAnecdote