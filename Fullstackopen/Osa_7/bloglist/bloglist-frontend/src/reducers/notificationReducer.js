import { createSlice } from '@reduxjs/toolkit'

const initialState = [

]

const notificationSlice = createSlice({
  name:'notification',
  initialState,
  reducers:{
    showNotification(state,action){
        console.log('SHOW')
      return(action.payload)
    },
    hideNotification(){
      console.log('HIDE')
      return initialState
    }
  }
})


export const { showNotification, hideNotification } = notificationSlice.actions


export const addNotification = (message, timeout) => {
  console.log('MESSAGE',message)
  console.log(message, timeout)

  return dispatch => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(hideNotification())
    }, timeout)
  }
}
export default notificationSlice.reducer