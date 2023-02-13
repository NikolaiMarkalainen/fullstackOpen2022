import {Diaries} from '../types'
const Diary = (props: {part: Diaries[] }) => {
    
    console.log(props.part)
    return(
        <div>
            <h1>Diary entries</h1>
            <ul>
            {props.part.map(n => 
            <li key={n.id}>
                {n.date}
                <br></br>
                {n.weather}
                <br></br>
                {n.visibility}
                <br></br>
            </li>)}
            </ul>
        </div>
    )

}

export default Diary