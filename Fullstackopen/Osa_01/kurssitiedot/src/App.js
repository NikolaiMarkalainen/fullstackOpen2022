const Header = (course) =>{
  return(
    <div>
      <h1>{course.course}</h1>
    </div>
  )
}

const Part = (part) => {
 return(
  <div>
      <p>{part.name} {part.amount}</p>
    </div>
 )
}

const Content = (prop) =>{
  return(
    <div>
      <Part name = {prop.course} amount = {prop.exercise} />
      <Part name = {prop.course2} amount = {prop.exercise2} />
      <Part name = {prop.course3} amount = {prop.exercise3} />     
    </div>
  )
}

const Total = (total) =>{
  return(
    <div>
      <p>Number of exercises {total.sum}</p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content course={part1} exercise={exercises1}/>
      <Content course2={part2} exercise2={exercises2}/>
      <Content course3={part3} exercise3={exercises3}/>
      <Total sum={exercises1+exercises2+exercises3} />
    </div>
  )
}

export default App