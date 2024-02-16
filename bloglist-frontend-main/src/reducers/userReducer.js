import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    getUser(state, action) {
      const loggedUserJson = window.localStorage.getItem("loggedBlogappuser");
      if (loggedUserJson) {
        const user = JSON.parse(loggedUserJson);
        blogService.setToken(user.token);
        return user;
      }
      return null;
    },
    loginUser(state, action) {
      console.log(action);
      
      window.localStorage.setItem(
        "loggedBlogappuser",
        JSON.stringify(action.payload)
      );
      blogService.setToken(action.payload.token);
      return action.payload;
    },
    logOutUser(state, action) {
      window.localStorage.removeItem("loggedBlogappuser");
      return null;
    },
  },
});

export const { getUser, loginUser , logOutUser} = userSlice.actions;

export const getUserAction = () => {
  return (dispatch) => {
    dispatch(getUser());
  };
};

export const loginUserAction = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    dispatch(loginUser(user));
  };
};

export const logOutAction = ()=>{
    return dispatch =>{
        dispatch(logOutUser())
    }
}
export default userSlice.reducer;
