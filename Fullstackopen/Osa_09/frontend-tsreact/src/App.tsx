import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";
import courses from "./data/course";
const App = () => {
  console.log(courses)
  const courseName = "Half Stack application development";
  const courseExercises = courses.map(c => c.exerciseCount);

  return (
    <div>
     <Header text={courseName} />
     <Content part={courses} />
     <Total  exercises={courseExercises}/>
    </div>
  );
};

export default App;