import { useSelector } from "react-redux"
import { createSlice } from "@reduxjs/toolkit"
import { Dispatch } from "react"
const initialState = {
    content: ''
}


const notificationSlice = createSlice ({
    name:'notification', 
    initialState,
    reducers:{
        showNotification(state,action){
            console.log(action.payload)
            return(action.payload)
        },
        hideNotification(state,action){
            return initialState
        }
    }
})

export const { showNotification, hideNotification} = notificationSlice.actions

export const voteNotification = (message, timeout) => {
    console.log(message, timeout)
    return  dispatch => {
        dispatch(showNotification(message.message))        
        setTimeout(() => {
            dispatch(hideNotification())        
        }, timeout)
    } 
}

export const addNotification = (message, timeout) => {
    console.log(message,timeout)
    return dispatch => {
        dispatch(showNotification(message))
        setTimeout(()=>{
            dispatch(hideNotification())
        }, timeout)
    }
}
export default notificationSlice.reducer
