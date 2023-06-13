import { Diaries,Notification } from "../types";
import { useState } from "react";
import { createDiary } from "../services/DiaryService";
import axios, {AxiosError} from "axios";
import { Weather, Visibility } from "../types";

const AddDiaries = (props: {data: React.Dispatch<React.SetStateAction<Diaries[]>>, diarylist: Diaries[], setError: React.Dispatch<React.SetStateAction<Notification>> }) => {
    const [date, setDate] = useState('');
    const [weather, setWeather]= useState(''); 
    const [visibility, setVisibility] = useState('');
    const [comment, setComment] = useState('');
    const setDiary = props.data;
    const diaries = props.diarylist;
    const weatherOptions = Object.values(Weather);    
    const visibilityOptions = Object.values(Visibility);
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
                <input
                type="date"
                value={date} 
                onChange={(event) => setDate(event.target.value)}/>
                <br></br>
                Weather:
                {weatherOptions.map((option, index) => (
                    <label key={index}>
                    <input 
                        type="radio"
                        name="weather"
                        value={option} 
                        checked={weather === option}
                        onChange={(event) => setWeather(event.target.value)}
                        />
                        {option}
                    </label>
                ))}
                <br></br>
                Visibility:
                {visibilityOptions.map((option, index) => (
                    <label key={index}>
                        <input 
                        type="radio"
                        name="visibility"
                        value={option}
                        checked={visibility === option}
                        onChange={(event) => setVisibility(event.target.value)}
                        />
                        {option}
                    </label>
                ))}
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