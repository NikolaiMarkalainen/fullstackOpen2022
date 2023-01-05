import { useDispatch, useSelector} from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
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
    if(anecdotes.map === undefined){
        console.log(anecdotes)
        return(
            <div>
                hi
            </div>
        )
    }
    else{
    console.log("anecdotes",anecdotes)
    return (
        <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
        <Anecdote
        key ={anecdote.id}
        anecdote = {anecdote}
        handleClick={() =>
        dispatch(voteAnecdote(anecdote.id)) &&
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
}
export default Anecdotes