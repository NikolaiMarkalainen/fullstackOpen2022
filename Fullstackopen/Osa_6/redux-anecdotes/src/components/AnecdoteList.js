import { useDispatch, useSelector} from "react-redux";
import { updateVote, voteAnecdote } from "../reducers/anecdoteReducer";
import { removeNotification,voteNotification } from "../reducers/notificationReducer";
import Filter from "./Filter";
const Anecdote = ({ anecdote, handleClick}) => {

    return(
        <div>
            {anecdote.content}
            <br></br>
            has {anecdote.votes}
            <button onClick={handleClick}>Vote</button>
        </div>
    )
}
const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    console.log(anecdotes)
    console.log("anecdotes",anecdotes)
    return (
        <div>
        <h2>Anecdotes</h2>
        <Filter anecdotes = {anecdotes}/> 
        {anecdotes.map(anecdote =>
        <Anecdote
        key ={anecdote.id}
        anecdote = {anecdote}
        handleClick={() =>
        dispatch(updateVote(anecdote)) &&
        dispatch(voteNotification('You have voted:'+ ' ' + anecdote.content)) &&
        setTimeout(() => {
            dispatch(removeNotification(anecdote))
        }, 5000)
        }
        
        />
        )}
        </div>
    )
}
export default Anecdotes