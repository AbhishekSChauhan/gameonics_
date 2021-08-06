import React from "react";
import { Link } from "react-router-dom";

import Input from "../Input";
import Button from "../Button";
import Signup from "./Signup";
// import SocialLogin from './SocialLogin'

const LoginForm = ({ handleSubmit, setEmail, setPassword, loading, setLoggedInStatus }) => {
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
          <Button type="submit" buttonText="Sign In" loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;