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

  
  export default Course
