import { updateVote } from "../reducers/anecdoteReducer";
import { voteNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";
import Filter from "./Filter";

const Anecdotes = (props) => {
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

    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter/> 
            {props.anecdotes.map(anecdote =>
            <Anecdote
                key ={anecdote.id}
                anecdote = {anecdote}
                handleClick={() =>
                    props.updateVote(anecdote) &&
                    props.voteNotification(`You have voted '${anecdote.content}'`, 5000)
                }
            />)}
        </div>
    )
}
const mapStateToProps = (state) => {
    return{
        anecdotes: state.anecdotes
    }
}

const mapDispatchToProps = {
    updateVote,
    voteNotification
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
)(Anecdotes)
export default ConnectedAnecdotes