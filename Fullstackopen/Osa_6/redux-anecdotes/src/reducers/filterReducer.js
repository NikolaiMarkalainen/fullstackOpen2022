import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    content: []
}

const filterSlice = createSlice ({
    name: 'filter',
    initialState,
    reducers:{
        filterAnecdotes(state,action){
            const content = action.payload
            console.log(content)
            return {
            ...state, 
            content:[content]
            }
        }
    },
})

export const {filterAnecdotes, postAnecdote} = filterSlice.actions
export default filterSlice.reducer