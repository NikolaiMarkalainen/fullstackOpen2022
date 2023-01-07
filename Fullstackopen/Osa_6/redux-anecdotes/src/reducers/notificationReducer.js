import { useSelector } from "react-redux"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    content: ''
}


const notificationSlice = createSlice ({
    name:'notification', 
    initialState,
    reducers:{
        showNotification(state,action){
            console.log(action.payload)
            return(action.payload.message)
        },
        hideNotification(state,action){
            return initialState
        }
    }
})

export const {addNotification, showNotification, hideNotification} = notificationSlice.actions

export const voteNotification = (message, timeout) => {
    return  dispatch => {
        dispatch(showNotification({message, timeout}))        
        setTimeout(() => {
            dispatch(hideNotification({message, timeout}))        
        }, timeout)
    } 
}
export default notificationSlice.reducer
