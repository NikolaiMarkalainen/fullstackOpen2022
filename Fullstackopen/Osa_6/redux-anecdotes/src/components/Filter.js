import { useDispatch ,useSelector } from "react-redux";
import { useState } from "react";
import { updateAnecdotes } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";

const Filter = (props) => {
    const [search, setSearch] = useState([])
    const [gotAnecdotes, setAnecdotes] = useState([])
    const dispatch = useDispatch()
    console.log("FILTER",props.anecdotes)
    const allAnecdotes  = props.anecdotes



    const handleFilter = (event) => {
    setSearch(event.target.value)
    let searchValue = event.target.value.toLowerCase()
    const quotes = allAnecdotes.map(n => n.content.toLowerCase().includes(searchValue))
    const selectedData = allAnecdotes.filter((value,index) => quotes[index])
    setAnecdotes(selectedData)
    console.log(gotAnecdotes.length === 0)
    if(gotAnecdotes.length===0){
        console.log("ITS ZERO")
    }
    else{
        props.updateAnecdotes(gotAnecdotes)
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
const mapStateToProps = (state) => {
    return{
        anecdotes: state.anecdotes
    }
}

const mapDispatchToProps = {
    updateAnecdotes
}

const ConnectedFilter = connect(
    mapStateToProps, 
    mapDispatchToProps
)(Filter)

export default ConnectedFilter