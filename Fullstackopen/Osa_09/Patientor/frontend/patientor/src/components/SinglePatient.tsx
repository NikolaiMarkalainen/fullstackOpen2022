import { Patient } from "../types";

const SinglePatient = (props: {patient: Patient | null | undefined}) => {
    console.log(props.patient?.entries);
    const entryData = props.patient?.entries;
    console.log(entryData);
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
            <h2>Entries</h2>
            <div>{entryData?.map((o) => (
                <div key={o.id}>
                    Date: {o.date}<br></br>
                    Description: {o.description}<br></br>
                    Diagnosis Code: {o.diagnosisCodes}<br></br>
                </div>
            ))}</div>
        </div>
    );
};

export default SinglePatient;