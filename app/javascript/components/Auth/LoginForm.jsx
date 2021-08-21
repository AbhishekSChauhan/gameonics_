import React from "react";
import { Link } from "react-router-dom";

import Input from "../Input";
import Button from "../Button";
import Signup from "./Signup";
// import SocialLogin from './SocialLogin'

const LoginForm = ({ handleSubmit, setEmail, setPassword, loading }) => {
  return (

    <div
      className="flex items-center justify-center min-h-screen
      px-4 py-12 lg:px-8 bg-gray-50 sm:px-6"
    >
      <div className="w-full max-w-md">
        <h2
          className="mt-6 text-3xl font-extrabold leading-9
          text-center text-bb-gray-700"
        >
          Sign In
        </h2>
        <div className="text-center">
          <Link to="/signup"
            render={props=>(
              <Signup {...props} setLoggedInStatus={setLoggedInStatus} />
            )}
            className="mt-2 text-sm font-medium text-bb-purple
            transition duration-150 ease-in-out focus:outline-none
            focus:underline"
          >
            Or Register Now
          </Link>
        </div>

        {/* <div>
          <div className="mt-8 text-sm font-medium text-bb-purple
            transition duration-150 ease-in-out focus:outline-none
            focus:underline">
              <SocialLogin />
          </div>
        </div> */}

        <form className="mt-8" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" buttonText="Sign In" loading={loading} disabled={loading} />
        </form>
      </div>
    </div>

    // <div className="flex items-center justify-center mt-16 mx-6">
    // <div className="p-6 max-w-sm w-full bg-gray-800 shadow rounded-md">
    //     <h3 className="text-white text-xl text-center">Login</h3>

    //     <form className="mt-4" method="POST" onSubmit={handleSubmit}>
    //         <input type="hidden" name="_token" value="96LGLQC0ylNCwHDLyTqFuBvSMwOqHi7voLu8lwj4" />
    //         <label className="block">
    //             <span className="text-white text-sm">E-Mail Address</span>
    //             <input type="email" id="email" name="email" className="form-input mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white" 
    //                 onChange={(e) => setEmail(e.target.value)} required autocomplete="email" autofocus />

    //         </label>

    //         <label className="block mt-3">
    //             <span className="text-white text-sm">Password</span>
    //             <input id="password" type="password" className="form-input mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white" 
    //             name="password" onChange={(e) => setPassword(e.target.value)} required autocomplete="current-password" />

    //         </label>

    //         <div className="flex justify-between items-center mt-4">
    //             <div>
    //                 <label className="inline-flex items-center">
    //                     <input type="checkbox" className="form-checkbox text-blue-500 bg-gray-800 border-gray-600" name="remember" id="remember" />
    //                     <span className="mx-2 text-gray-200 text-sm">Remember Me</span>
    //                 </label>
    //             </div>

    //             <div>
    //                 <a className="block text-sm text-blue-500 hover:underline" href="http://localhost:8000/password/reset">
    //                     Forgot Your Password?
    //                 </a>
    //             </div>
    //         </div>

    //         <div className="mt-6">
    //             <button type="submit" className="w-full py-2 px-4 text-center bg-blue-600 rounded-md text-white text-sm hover:bg-blue-500 focus:outline-none">
    //                 Login
    //             </button>
    //         </div>
    //     </form>
    // </div>
    // </div>
  );
};

export default LoginForm;