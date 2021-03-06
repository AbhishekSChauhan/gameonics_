import React from "react";
import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { MdLockOutline } from "react-icons/md";
import Loader from "./Loader";


const LoginForm = ({ handleSubmit, setCredential, setPassword, loading }) => {
  return (

  

  <div className="flex flex-col mt-28 sm:mt-20 items-center">

  <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3  px-6 lg:px-16 xl:px-12
        flex items-center justify-center">

    <div className="w-full h-auto">

      <h1 className="text-xl md:text-2xl font-bold leading-tight">Log in to your account</h1>

      <form className="mt-6" onSubmit={handleSubmit} >
        
      <div>
        <label className="block text-gray-700">Email or Username</label>
        <div className="flex">
          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
          <VscAccount className="text-gray-400 text-lg"/>
          </div>
          <input onChange={(e) => setCredential(e.target.value)}
          placeholder="Enter Email or Username" 
          className="w-full py-3 -ml-10 pl-10 pr-3 rounded-lg bg-gray-200  
          border items-center focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus required />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-gray-700">Password</label>
        <div className="flex">
          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
            <MdLockOutline className="text-gray-400 text-lg" />
          </div>
          <input type="password" onChange={(e) => setPassword(e.target.value)} 
          placeholder="********" minLength="8"
          className="w-full py-3 -ml-10 pl-10 pr-3 rounded-lg bg-gray-200  
          border items-center focus:border-blue-500 focus:bg-white focus:outline-none" />
        </div>
      </div>


        <div className="text-right mt-2">
          <Link to="/forgot_password" 
          className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
          Forgot Password?
          </Link>
        </div>

        <button type="submit" disabled={loading}
            className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white
               font-semibold rounded-lg px-4 py-3 mt-6">
                 {loading ? (
                   <div>
                     <Loader />
                   </div>
                 ) : (
                   <span>Log In</span>
                 )}
        </button>
      </form>

      <p className="mt-8">
        Need an account? 
        <Link to="/signup" className="text-blue-500 hover:text-blue-700 font-semibold">
          Create an account
        </Link>
      </p>
    </div>
  </div>

</div>

   
  );
};

export default LoginForm;