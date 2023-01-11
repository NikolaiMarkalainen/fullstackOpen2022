import { createSlice } from '@reduxjs/toolkit'



const notificationSlice = createSlice({
  name:'notification',
  initialState:[],
  reducers:{
    showNotification(state,{ payload: { message, styling } }){
      return{
        ...state,
        message,
        styling
      }
    },
    hideNotification(){
      console.log('HIDE')
      return ''
    }
  }
})


export const { showNotification, hideNotification } = notificationSlice.actions


export const addNotification = (message, timeout, styling) => {
  console.log('MESSAGE',message)
  console.log('MESSAGE',message, 'TIMEOUT',timeout, 'STYLING',styling)

  return dispatch => {
    dispatch(showNotification({ message, styling }))
    setTimeout(() => {
      dispatch(hideNotification())
    }, timeout)
  }
}
export default notificationSlice.reducer