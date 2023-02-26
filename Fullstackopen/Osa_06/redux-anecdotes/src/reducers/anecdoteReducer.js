import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"




const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState: [],
  reducers:{
    voteAnecdote(state,action) {
      const id = action.payload.id
      const votedAnecdote = state.find(n => n.id === id)
      const addedVoteToAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1 
      }
      state = state.map(anecdote => 
        anecdote.id !== id ? anecdote: addedVoteToAnecdote)
      return state.sort((a,b) => {
        return b.votes - a.votes
      })
    },
    updateAnecdotes(state = [],action){
      const content = action.payload
      if(Object.keys(action.payload).length > 0){
       return content
      }
      else{
        return {...state}
      }
      },
      appendAnecdote(state,action){
        state.push(action.payload)
      },
      setAnecdotes(state,action){
        return action.payload
      }
  }
})


export const { voteAnecdote, updateAnecdotes, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  console.log('CREATE', content)
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVote = content => {
  return async dispatch => {
    const newLikedValue = {
      content: content.content,
      id: content.id,
      votes: content.votes +1
    }
    const newAnecdote = await anecdoteService.updateVote(content.id, newLikedValue)
    dispatch(voteAnecdote(newAnecdote))
  }
}
export default anecdoteSlice.reducer