import { useSelector } from "react-redux"
import { createSlice } from "@reduxjs/toolkit"

const initialState = 'redux sucks'

const notificationSlice = createSlice ({
    name:'notification', 
    initialState,
    reducers:{
        addNotification(state,action){
            const content = action.payload
            state.push(content)
        }
    }
    /*voteNotification(state,action){

    }*/

})
export const {addNotification} = notificationSlice.actions
export default notificationSlice.reducer