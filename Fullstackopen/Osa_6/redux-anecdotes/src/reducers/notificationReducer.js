import { useSelector } from "react-redux"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    content: ''
}


const notificationSlice = createSlice ({
    name:'notification', 
    initialState,
    reducers:{
        addNotification(state, action){
            console.log(state)
            console.log('IN ADDNOTIFICATION')
            const notification = action.payload
            console.log(notification)
            return notification
        },
        voteNotification(state, action){
            console.log(state)
            console.log('IN VOTE NOTIFICATION')
            const notification = action.payload
            return notification
        },
        removeNotification(state,action){
            console.log(state)
            console.log('IN NOTIFICATION REMOVAL')
            return initialState
        }
    }
})
export const {addNotification, voteNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer
