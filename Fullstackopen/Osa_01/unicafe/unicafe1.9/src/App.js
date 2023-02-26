import { useState } from 'react'

const Header = (prop) =>{
  return(
  <div>
    <h1>{prop.text}</h1>
  </div>
  )
}

const Statistics = (prop)=>{
  if(prop.all ===0){
    return(
      <p> No feedback given</p>
    )
  }
  else{
    if(prop.good > prop.bad){
    return(
      <div>
        <p>Good = {prop.good}</p>
        <p>Neutral = {prop.neutral}</p>
        <p> Bad = {prop.bad}</p>
        <p>All clicks = {prop.all}</p>
        <p>Average is = {(prop.good * 1 + prop.neutral * 0 + prop.bad * -1 )/ prop.all }</p>
        <p>Positive feedback is = {(prop.good / prop.all) * 100} %</p>
      </div>
    )   
    }
    else{
      return(
        <div>
          <p>Good = {prop.good}</p>
          <p>Neutral = {prop.neutral}</p>
          <p> Bad = {prop.bad}</p>
          <p>All clicks = {prop.all}</p>
          <p>Average is = {(prop.good * 1 + prop.neutral * 0 + prop.bad * -1 )/ prop.all }</p>
          <p>Positive feedback is = below 0%</p>
        </div>
      )
  }
  }
}
const Results = (prop) =>{
  return(
    <div>
      <h1>{prop.result}</h1>
    </div>
  )
}


const App = () => {
  const title = 'Give feedback!'
  const stats = 'Statistics'
  const [clicks, setClicks] =useState({
    good: 0,
    bad: 0,
    neutral: 0,
    all: 0
  })
const handleGood = () =>{
  const newClicks = {
    ...clicks,
    good: clicks.good + 1,
    all: clicks.all +1
  }
  setClicks(newClicks)
}
const handleBad = () =>{
  const newClicks = {
    ...clicks,
    bad: clicks.bad + 1,
    all: clicks.all +1

  }
  setClicks(newClicks)
}
const handleNeutral = () =>{
  const newClicks = {
    ...clicks,
    neutral: clicks.neutral + 1,
    all: clicks.all +1
  }
  
  setClicks(newClicks)
}

  return (
    <div>
      <Header text={title} />
      <div>
        <button onClick={handleGood}>Good</button>
        <button onClick={handleNeutral}>Neutral</button>
        <button onClick={handleBad}>Bad</button>
      </div>
      <Results result={stats}/>
      <Statistics good = {clicks.good} neutral = {clicks.neutral} bad = {clicks.bad} all ={clicks.all}/>
    </div>
  )
}
export default App