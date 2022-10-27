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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  console.log(course)
  return (
    <div>
      <Header course={course.name} />
      <Content course={course.parts[0].name} exercise={course.parts[0].exercises}/>
      <Content course2={course.parts[1].name} exercise2={course.parts[1].exercises}/>
      <Content course3={course.parts[2].name} exercise3={course.parts[2].exercises}/>
      <Total sum={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
    </div>
  )
}

export default App