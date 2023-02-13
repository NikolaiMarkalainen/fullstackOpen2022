import { Diaries,newDiaries } from "../types";
import { useState } from "react";
import { createDiary } from "../services/DiaryService";

const AddDiaries = (props: {data: React.Dispatch<React.SetStateAction<Diaries[]>>, diarylist: Diaries[]}) => {
    const [date, setDate] = useState('');
    const [weather, setWeather]= useState('');
    const [visibility, setVisibility] = useState('');
    const [comment, setComment] = useState('');
    console.log(props.data)
    const diaryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const diaryObject = {
            date: date,
            weather: weather,
            visibility: visibility,
            comment: comment
        }
        console.log(diaryObject);
        createDiary( diaryObject ).then(data => {
            console.log(data);
            props.data(props.diarylist.concat(data));
        })

    }
    return(
        <div>
            <h1>Add a Diary entry</h1>
            <form onSubmit={diaryCreation}>
                Date:
                <input value={date} onChange={(event) => setDate(event.target.value)}/>
                <br></br>
                Weather:
                <input value={weather} onChange={(event) => setWeather(event.target.value)}/>
                <br></br>
                Visibility:
                <input value={visibility} onChange={(event) => setVisibility(event.target.value)}/>
                <br></br>
                Comment:
                <input value={comment} onChange={(event) => setComment(event.target.value)}/>
                <br></br>
                <button type='submit'>add</button>
            </form>
        </div>
    )
}

export default AddDiaries;