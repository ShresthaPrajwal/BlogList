import React from "react";

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
   }) => {
   return (
     <div className="text-center">
       <div className="text-4xl">Login</div>
 
       <form onSubmit={handleSubmit} className="flex flex-col justify-center content-center">
         <div className="flex justify-center content-center m-2">
           
           <input
           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
            id="username"
             value={username}
             onChange={handleUsernameChange}
             placeholder="Username"
           />
         </div>
         <div className="flex justify-center content-center m-2">
           
           <input
           placeholder="Password"
           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
           id="password"
             type="password"
             value={password}
             onChange={handlePasswordChange}
           />
       </div>
       <div>
       <button type="submit" id="login-button" className="text-gray-900 w-40 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-2 py-0.5 m-2">login</button>
       </div>
       </form>
     </div>
   )
 }
 
 export default LoginForm