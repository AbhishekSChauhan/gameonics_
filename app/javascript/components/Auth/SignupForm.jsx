import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { MdLockOutline } from "react-icons/md";
import Input from "../Input";
import Button from "../Button";
import Loader from "./Loader";
const SignupForm = ({
  handleSubmit,
  setUsername,
  setEmail,
  setPassword,
  setPasswordConfirmation,
  loading
}) => {
  
  return (

<div className="flex flex-col md:flex-row h-screen items-center">

<div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
  <img src="https://source.unsplash.com/random" alt="" className="w-full h-full object-cover" />
</div>

<div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center">

  <div className="w-full h-100">


    <div className="text-center mb-10">
        <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
        <p>Enter your information to register</p>
    </div>

    <form className="mt-6" onSubmit={handleSubmit} >
      <div>
        <label className="block text-gray-700">Username</label>
        <div className="flex">
          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
            <VscAccount className="text-gray-400 text-lg"/>
          </div>
          <input onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Email or Username" 
            className="w-full py-3 -ml-10 pl-10 pr-3 rounded-lg bg-gray-200  
            border items-center focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus required 
          /> 
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-gray-700">Email Address</label>
        <div className="flex">
          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
            <AiOutlineMail className="text-gray-400 text-lg"/>
          </div>
          <input type="email" onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email Address" 
          className="w-full py-3 -ml-10 pl-10 pr-3 rounded-lg bg-gray-200  
          border items-center focus:border-blue-500 focus:bg-white focus:outline-none"  />
        </div>
      </div>


      <div className="mt-4">
        <label className="block text-gray-700">Password</label>
        <div className="flex">
          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
            <MdLockOutline className="text-gray-400 text-lg" />
          </div>
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" minLength="8" className="w-full py-3 -ml-10 pl-10 pr-3 rounded-lg bg-gray-200  
              border items-center focus:border-blue-500 focus:bg-white focus:outline-none"   
          />
        </div>       
      </div>

      <div className="mt-4">
        <label className="block text-gray-700">Password Confirmation</label>
        <div className="flex">
          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
            <MdLockOutline className="text-gray-400 text-lg" />
          </div>
          <input type="password" onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Enter Password" minLength="8" className="w-full py-3 -ml-10 pl-10 pr-3 rounded-lg bg-gray-200  
              border items-center focus:border-blue-500 focus:bg-white focus:outline-none"   
          />
        </div>
      </div>

      
      <button type="submit" className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 
        text-white font-semibold rounded-lg px-4 py-3 mt-6">
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <span>Register</span>
          )}
      </button>
    </form>
  </div>
</div>

</div>


  );
};

export default SignupForm;