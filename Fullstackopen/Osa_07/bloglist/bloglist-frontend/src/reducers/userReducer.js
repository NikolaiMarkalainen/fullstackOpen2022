import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'


const userSlice = createSlice({
    name:'users',
    initialState:[],
    reducers:{
        setUsers(state,action){
            console.log(action)
            return action.payload
        }
    }
})

export const { setUsers } = userSlice.actions

export const initializeUsers = () => {
    console.log('initialize users')
    return async dispatch => {
        const users = await userService.getAll()
        dispatch(setUsers(users))
    }
}
export default userSlice.reducer