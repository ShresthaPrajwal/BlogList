import { configureStore } from '@reduxjs/toolkit'

import NotificationReducer from './reducers/notificationReducer'
import BlogReducer from './reducers/blogReducer';
import UserReducer from './reducers/userReducer'
import UsersReducer from './reducers/usersReducer'
const store = configureStore({
    reducer:{
        notification: NotificationReducer,
        blogs:BlogReducer,
        user: UserReducer,
        users: UsersReducer
    }
});

export default store