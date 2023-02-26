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

    return dispatch => {
        dispatch(showNotification(message))
            setTimeout(()=>{
                dispatch(hideNotification())
            }, timeout)
    }
}

export default notificationSlice.reducer
/*        setTimeout(() => {
            dispatch(hideNotification())        
        }, timeout)*/