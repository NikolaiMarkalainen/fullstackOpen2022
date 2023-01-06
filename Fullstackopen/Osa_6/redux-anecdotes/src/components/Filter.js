import { useDispatch ,useSelector } from "react-redux";
import { useState } from "react";
import { updateAnecdotes } from "../reducers/anecdoteReducer";


const Filter = (anecdotes) => {
    const [search, setSearch] = useState([])
    const [gotAnecdotes, setAnecdotes] = useState([])
    const dispatch = useDispatch()
    console.log("FILTER",anecdotes.anecdotes)
    const allAnecdotes  = useSelector(state => state.anecdotes)



    const handleFilter = (event) => {
    setSearch(event.target.value)
    let searchValue = event.target.value.toLowerCase()
    const quotes = allAnecdotes.map(n => n.content.toLowerCase().includes(searchValue))
    const selectedData = allAnecdotes.filter((value,index) => quotes[index])
    console.log(selectedData)
    setAnecdotes(selectedData)
    console.log("gotAnecs",gotAnecdotes)
    console.log(Object.keys(gotAnecdotes).length)

    if(Object.keys(gotAnecdotes).length > 0){
        dispatch(updateAnecdotes(gotAnecdotes))
    }

}

    return(
        <div>
            <div>
                Filter <input value={search}
                onChange ={handleFilter}/>
            </div>
        </div>
    )
}


export default Filter