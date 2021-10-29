import React from 'react'
import Button from '../Button'
import Input from '../Input'
import { MdLockOutline } from "react-icons/md";
import Loader from "./Loader";

const ResetPasswordForm = ({
    setPasswordConfirmation,
    setPassword,
    handleSubmit,
    loading
}) => {
    return (
    //   <div>
    //     <div
    //   className="flex items-center justify-center min-h-screen
    //   px-4 py-12 lg:px-8 bg-gray-50 sm:px-6"
    // >
    //   <div className="w-full max-w-md">
    
    //     <form className="mt-8" onSubmit={handleSubmit}>
    //       <Input
    //         label="Enter New Password"
    //         type="password"
    //         placeholder="********"
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //       <Input
    //         label="Password Confirmation"
    //         type="password"
    //         placeholder="********"
    //         onChange={(e) => setPasswordConfirmation(e.target.value)}
    //       />
    //       <Button type="submit" buttonText="Change Password" loading={loading} disabled={loading} />         
    //     </form>
    //   </div>
    // </div>

    <div className="flex flex-col h-screen items-center">

    <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center">
  
      <div className="w-full h-auto">
  
        <h1 className="text-xl md:text-2xl font-bold leading-tight">Change your password</h1>
  
        <form className="mt-6" onSubmit={handleSubmit} >
  
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

          <div className="mt-4">
            <label className="block text-gray-700">Password Confirmation</label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <MdLockOutline className="text-gray-400 text-lg" />
              </div>
              <input type="password" onChange={(e) => setPasswordConfirmation(e.target.value)} 
              placeholder="********" minLength="8"
              className="w-full py-3 -ml-10 pl-10 pr-3 rounded-lg bg-gray-200  
              border items-center focus:border-blue-500 focus:bg-white focus:outline-none" />
            </div>
          </div>          
  
          <button type="submit" disabled={loading}
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white
                 font-semibold rounded-lg px-4 py-3 mt-6">
                   {loading ? (
                     <div>
                       <Loader />
                     </div>
                   ) : (
                     <span>Change Password</span>
                   )}
          </button>
        </form>

      </div>
    </div>  
  </div>
    )
}

export default ResetPasswordForm
