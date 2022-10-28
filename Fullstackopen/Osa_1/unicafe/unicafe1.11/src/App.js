import { useState } from 'react'

const Header = (prop) =>{
  return(
  <div>
    <h1>{prop.text}</h1>
  </div>
  )
}

const Button = ({eventHandler, text}) =>(
  <button onClick ={eventHandler}>
   {text}
  </button>
)


const Statistics = (prop)=>{
  const StaticLine  =({text, value, xtra}) =>{
   return(
    <div>
      <table><tbody><tr><td>{text} {value} {xtra}</td></tr></tbody></table>
    </div>
   )
  }
  if(prop.all === 0){
    return(
      <p> No feedback given</p>
    )
  }
  else{
    if(prop.good > prop.bad){
    return(
      <div>
        <StaticLine text = "Good" value = {prop.good}/>
        <StaticLine text = "Neutral" value = {prop.neutral}/>
        <StaticLine text = "Bad" value = {prop.bad}/>
        <StaticLine text = "All" value = {prop.all}/>
        <StaticLine text = "Average" value = {(prop.good * 1 + prop.neutral * 0 + prop.bad * -1) / prop.all}/>
        <StaticLine text = "Positive feedback" value = {(prop.good / prop.all) * 100} xtra=" %"/>
      </div>
    )   
    }
    else{
      return(
        <div>
         <StaticLine text = "Good" value = {prop.good}/>
        <StaticLine text = "Neutral" value = {prop.neutral}/>
        <StaticLine text = "Bad" value = {prop.bad}/>
        <StaticLine text = "All" value = {prop.all}/>
        <StaticLine text = "Average" value = {(prop.good * 1 + prop.neutral * 0 + prop.bad * -1) / prop.all}/>
        <StaticLine text = "Positive feedback" value = {0} xtra=" %"/>
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
        <Button eventHandler={handleGood} text = 'Good'/>
        <Button eventHandler={handleNeutral} text = 'Neutral'/>
        <Button eventHandler={handleBad} text = 'Bad'/>
      </div>
      <Results result={stats}/>
    <Statistics good = {clicks.good} neutral = {clicks.neutral} bad = {clicks.bad} all ={clicks.all}/>
    </div>
  )
}
export default App