import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
  content: '',
  votes: 0
}



const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState: [],
  reducers:{
    createAnecdote(state,action) {
      state.push(action.payload)
    },
    voteAnecdote(state,action) {
      const id = action.payload
      const votedAnecdote = state.find(n => n.id === id)
      console.log(votedAnecdote.votes)
      const changedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }
      state = state.map(anecdote =>
      anecdote.id !== id ? anecdote: changedAnecdote)
      return state.sort((b,a) => {
        return a.votes - b.votes
      })
    },
    updateAnecdotes(state = [],action){
      console.log("ACTION PAYLOAD",action.payload)
      const content = action.payload
      if(Object.keys(action.payload).length > 0){
       return content
      }
        else{
          return initialState
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


export const { createAnecdote, voteAnecdote, updateAnecdotes, appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer