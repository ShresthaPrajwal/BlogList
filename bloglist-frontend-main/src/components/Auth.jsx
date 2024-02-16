import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import Togglable from "./Togglable";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAction,
  logOutAction,
  loginUserAction,
} from "../reducers/userReducer";
import { updateMessage } from "../reducers/notificationReducer";

const Auth = ()=>{
    const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(getUserAction());
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging with", username, password);
    try {
      const cred = {
        username,
        password,
      };
      dispatch(loginUserAction(cred));
      setUsername("");
      setPassword("");
      dispatch(updateMessage(`Login Sucessful`, 5000));
    } catch (exception) {
      dispatch(updateMessage(`Wrong Credentials`, 5000));
    }
  };

  const logoutHandler = () => {
    dispatch(logOutAction());
    dispatch(updateMessage(`Logout Sucessful`, 5000));
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    );
  };

  return (
    <footer className=" mt-auto text-center">
      

      {user === null && loginForm()}

      {user && (
        <div className="flex justify-between m-2">
          <p>{user.name} is logged in.</p>
          <button onClick={() => logoutHandler()} className="px-10 text-red-700">Log Out</button>
        </div>
      )}

      
    </footer>
  );


}

export default Auth;