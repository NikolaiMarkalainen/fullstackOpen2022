import { CoursePart } from "../types";
import Part from "./Part";
const Content = (props: {part: CoursePart[] }) => {
    return(
    <>
        <Part data={props.part}/>
    </>
    )
};

export default Content;