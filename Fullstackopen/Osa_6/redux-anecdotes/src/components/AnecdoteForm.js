import { createAnecdote } from "../reducers/anecdoteReducer"
import { voteNotification } from "../reducers/notificationReducer"
import { connect } from "react-redux"
const NewAnecdote = (props) => {
    const addAnecdote = async (event) => {
            event.preventDefault()
            const content = event.target.anecdote.value
            event.target.anecdote.value = ''
            props.createAnecdote(content) &&
            props.voteNotification(`You have added: ${content}`, 5000)
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

const mapStateToProps =(state) => {
    return{

    }
}

const mapDispatchToProps = {
    createAnecdote,
    voteNotification
}

const ConnectedNewAnecdotes = connect(mapStateToProps,mapDispatchToProps)(NewAnecdote)
export default ConnectedNewAnecdotes