const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => {
  const result = sum.map(part => part.exercises).reduce((partialSum, a) => partialSum + a,0)
return(
  <p>
    The total is {result}
  </p>
)
}


const Part = ({ part }) => {
return(
  <ul>
    <li>
      {part.name} {part.exercises}
    </li>
  </ul>
)
}
const Content = ({ parts }) => 
  <>
  {parts.map(part => <Part key = {part.id} part ={part}/>)}

  </>

const Course = (props) =>{
  return(
    <div>
    <Header course = {props.course.name}/>
    <Content parts = {props.course.parts}/>
    <Total sum = {props.course.parts}/>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App