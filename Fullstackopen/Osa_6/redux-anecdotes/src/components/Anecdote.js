import { useDispatch, useSelector} from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

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

        <h2>Anecdotes</h2>
const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)
    console.log("anecdotes",anecdotes)
    return (
        <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
        <Anecdote
        key ={anecdote.id}
        anecdote = {anecdote}
        handleClick={() =>
        dispatch(voteAnecdote(anecdote.id))}
        />
        )}
        </div>
    )
}
export default Anecdotes