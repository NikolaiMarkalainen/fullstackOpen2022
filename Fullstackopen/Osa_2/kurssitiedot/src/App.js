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

const Course = ({course}) =>{
  console.log(course, "Course")
  return(
    <div>
    <Header course = {course.name}/>  
    <Content parts = {course.parts}/>
    <Total sum = {course.parts}/>
    </div>
  )
}

const App = () => {
  const courses = [
    {
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
  {courses.map(course => <Course key = {course.id} course ={course}/>)}
    </div>
  )
}

export default App