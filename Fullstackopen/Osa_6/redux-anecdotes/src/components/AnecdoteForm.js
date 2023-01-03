import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { addNotification } from "../reducers/notificationReducer"
const NewAnecdote = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        console.log(content)
        console.log(event.target.anecdote.value)

        event.target.anecdote.value = ''
        console.log(event.target.anecdote.value)
        dispatch(createAnecdote(content))
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