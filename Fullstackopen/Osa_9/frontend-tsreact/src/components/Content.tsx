import { CourseEntry } from "../types";

const Content = (props: {data: CourseEntry[] }) => {
    return(
    <div>
        {props.data.map((course, index) => (
            <p key={index}>{course.name} {course.exerciseCount}</p>
        ))}
    </div>
    )
};

export default Content;