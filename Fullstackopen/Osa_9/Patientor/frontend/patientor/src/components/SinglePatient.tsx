import { Patient } from "../types";

const SinglePatient = (props: {patient: Patient | null | undefined}) => {
    console.log(props);
    return(
        <div>
            <h1>
            {props.patient?.name}
            </h1>
            <div>
                Birthday: <b>{props.patient?.dateOfBirth}</b>
            </div>
            <div>
                occupation: <b>{props.patient?.occupation}</b>
            </div>
        </div>
    );
};

export default SinglePatient;