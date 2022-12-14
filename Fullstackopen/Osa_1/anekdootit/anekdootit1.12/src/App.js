import { useState } from 'react'

const Button = ({eventHandler, text}) => (
<button onClick = {eventHandler}>
  {text}
</button>
)

const Votes = ({array}) => {
  return(
  <p>has {array} votes</p>
  )
}

const App = () => {
  const [selected, setSelected] = useState(0)
  const [voteClicks, setAllVotes] = useState(Array(7).fill(0))
  const [highScore, setWeeklyMessage] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const handleClick = () => { 
    let random = Math.floor(Math.random()* 7)
    setSelected(random)
  }
  const voteAnecdote = () => {
    const newVotes = [... voteClicks]
    newVotes[selected] += 1
    setAllVotes(newVotes)
    let max = Math.max(... newVotes)
    let index = newVotes.indexOf(max)
    setWeeklyMessage(index)
    console.log(Math.max(... newVotes))
    }

  console.log(selected)
  return (
    <div>
      <h1>Anecdotes</h1>
      {anecdotes[selected]}
      <br></br>
      <Button eventHandler={handleClick} text="Next Anecdote"/>
      <Button eventHandler={voteAnecdote} text="Vote"/>
      <Votes array ={voteClicks[selected]}/>
      <h1>Anecdote of the week</h1>
      <Votes array = {voteClicks[highScore]}/>
      <p>{anecdotes[highScore]}</p>
    </div>
  )
  }

export default App