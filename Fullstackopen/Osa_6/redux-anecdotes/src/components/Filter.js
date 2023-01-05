import { useDispatch ,useSelector } from "react-redux";
import { useState } from "react";
import { filterAnecdotes } from "../reducers/filterReducer";
import { updateAnecdotes } from "../reducers/anecdoteReducer";


const Filter = () => {
    const [search, setSearch] = useState([])
    const dispatch = useDispatch()

const handleFilter = (event) => {
    setSearch(event.target.value)

    let searchValue = event.target.value.toLowerCase()
    dispatch(filterAnecdotes(searchValue)) &&
    dispatch(updateAnecdotes(searchValue))
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

/*
    const filterApplied =filter.map(n => n.content).filter(n => {
        return n.includes(searchValue)
    })

*/

export default Filter