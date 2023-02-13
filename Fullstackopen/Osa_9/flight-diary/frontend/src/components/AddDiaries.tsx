import { Diaries,Notification } from "../types";
import { useState } from "react";
import { createDiary } from "../services/DiaryService";
import axios, {AxiosError} from "axios";

const AddDiaries = (props: {data: React.Dispatch<React.SetStateAction<Diaries[]>>, diarylist: Diaries[], setError: React.Dispatch<React.SetStateAction<Notification>> }) => {
    const [date, setDate] = useState('');
    const [weather, setWeather]= useState(''); 
    const [visibility, setVisibility] = useState('');
    const [comment, setComment] = useState('');
    const setDiary = props.data;
    const diaries = props.diarylist;

    const diaryCreation = async (event: React.SyntheticEvent) => {
        try{
            event.preventDefault();
            const diaryObject = {
                date: date,
                weather: weather,
                visibility: visibility,
                comment: comment
            }
            console.log(diaryObject);
            await createDiary( diaryObject ).then(data => {
                console.log(data);
                setDiary(diaries.concat(data));
            })
        } catch (error: any){
            console.log('here')
            console.log(error);
            if(axios.isAxiosError(error)) {
                console.log(error.status);
                props.setError(error.response?.data);
                console.log(error.response);
            } else{
                console.error(error);
            }
        }
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