import { CoursePart } from "../types";


const Part = (props: {data: CoursePart[] } ) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
    const courseParts = props.data;
    return(
        <>
        {courseParts.map((part, id) => {
            switch(part.type) {
                case "normal":
                    return(
                        <div key={id}>
                            <h1>{part.name}</h1>
                            <p><b>Exercise count:</b> {part.exerciseCount}</p>
                            <p><b>Description:</b> {part.description}</p>
                        </div>
                    )
                case "groupProject":
                    return(
                        <div key={id}>
                            <h1>{part.name}</h1>
                            <p><b>Exercise count:</b> {part.exerciseCount}</p>
                            <p><b>Group project count:</b> {part.groupProjectCount}</p>
                        </div>
                    )
                case "submission":
                    return(
                    <div key={id}>
                        <h1>{part.name}</h1>
                        <p><b>Exercise count:</b> {part.exerciseCount}</p>
                        <p><b>Exercise submission link:</b> {part.exerciseSubmissionLink}</p>
                        <p><b>Description:</b> {part.description}</p>
                    </div>
                    )

                case "special":
                    return(
                        <div key={id}>
                            <h1>{part.name}</h1>
                            <p><b>Exercise count:</b> {part.exerciseCount}</p>
                            <p><b>Requirements:</b> {part.requirements}</p>
                            <p><b>Description:</b> {part.description}</p>
                        </div>
                    )
                default:
                    return assertNever(part)
            }
        })}
        </>
    )
}

export default Part;