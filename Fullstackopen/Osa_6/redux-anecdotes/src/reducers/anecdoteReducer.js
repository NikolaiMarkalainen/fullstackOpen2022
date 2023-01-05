import { createSlice, current } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return{
    content:anecdote,
    id:getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)



const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState,
  reducers:{
    createAnecdote(state,action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0
      })
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
    updateAnecdotes(state,action){
      console.log("ACTION PAYLOAD",action.payload)
      if(state.map === undefined){
        console.log("AAAA",current(state))
        return{
          ...state
        }
      }
      else{
        const anecs = (state.map(n => n.content))
        const filteredContent =anecs.filter(n =>
           n.includes(action.payload))
          state.map(anecdote =>
            anecdote.content !== anecs ? anecdote : filteredContent)
          
        console.log(current(state = anecs.includes))
        console.log("ANECS",anecs)
        console.log("FILTERED",filteredContent)
        console.log("CURRENT",current(...state))
        const vals = state.map(anecdote => anecdote.content)
        return{
          ...state.includes(filteredContent),
          content: filteredContent
        }
      }

    }
  }
})


export const { createAnecdote, voteAnecdote, updateAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer