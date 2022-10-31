const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => {
console.log(part, "parts")
console.log(part.exercises, "Part comp")
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
  console.log(props.course.parts, "Course component")
  return(
    <div>
    <Header course = {props.course.name}/>
    <Content parts = {props.course.parts}/>

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