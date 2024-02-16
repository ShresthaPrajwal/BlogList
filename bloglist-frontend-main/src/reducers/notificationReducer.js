import {createSlice } from '@reduxjs/toolkit'

const NotificationSlice = createSlice({


    name:'notification',
    initialState:'',
    reducers:{

        updateNotification(state,action){
            const message = action.payload;
            return message
        }
    }
})
export const { updateNotification} = NotificationSlice.actions


//action creators
export const updateMessage = (message,timeout) =>{
    console.log(message)
    return dispatch =>{
        dispatch(updateNotification(message))
        setTimeout(()=>{
            dispatch(updateNotification(''))
        },timeout)
    }
}

export default NotificationSlice.reducer