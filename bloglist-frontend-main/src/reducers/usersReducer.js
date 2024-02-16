import {createSlice} from '@reduxjs/toolkit'
import userservice from '../services/users'


const usersSlice = createSlice({
    name: "users",
    initialState:[],
    reducers:{
        fetchUsers(state,action){
            console.log(action.payload)
            return action.payload
        }
    }
})

export const {fetchUsers} = usersSlice.actions

export const fetchUsersAction = ()=>{
    return async dispatch =>{
        const users = await userservice.getAll();
        console.log(users)
        dispatch(fetchUsers(users.data));
    }
}

export default usersSlice.reducer;