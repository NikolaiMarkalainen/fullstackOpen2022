const Header = (course) =>{
  return(
    <div>
      <h1>{course.course}</h1>
    </div>
  )
}

const Part = (part) => {
  console.log(part.parts)
  const t = [part.parts]
  const m2 = t.map(value =>  value.name + ' ' +value.exercises)
  return(
  <div>
      <p>{m2}</p>
  </div>
 )
}

const Content = (prop) =>{
  return(
    <div>
      <Part parts = {prop.parts[0]} />
      <Part parts = {prop.parts[1]} />
      <Part parts = {prop.parts[2]} />
    </div>
  )
}

const Total = (prop) =>{
  console.log(prop.sum)
  const total = prop.sum.reduce(
    (prevValue, currentValue) => prevValue + currentValue.exercises, 0);
  return(
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts =[
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
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total sum={parts}/>
    </div>
  )
}

export default App

/*
      <Content course={parts[0].name} exercise={parts[0].exercises}/>
      <Content course2={parts[1].name} exercise2={parts[1].exercises}/>
      <Content course3={parts[2].name} exercise3={parts[2].exercises}/>
      */