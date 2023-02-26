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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content course={part1.name} exercise={part1.exercises}/>
      <Content course2={part2.name} exercise2={part2.exercises}/>
      <Content course3={part3.name} exercise3={part3.exercises}/>
      <Total sum={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App