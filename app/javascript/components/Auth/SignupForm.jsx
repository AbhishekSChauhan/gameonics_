import React from "react";
import { Link } from "react-router-dom";

import Input from "../Input";
import Button from "../Button";
const SignupForm = ({
  handleSubmit,
  setUsername,
  setEmail,
  setPassword,
  setPasswordConfirmation,
}) => {
  
  return (
    <div
      className="flex items-center justify-center min-h-screen px-4
    py-12 sm:px-6 lg:px-8 bg-gray-50 "
    >
      <div className="w-full max-w-md">
        <h2
          className="mt-6 text-3xl font-extrabold leading-9
        text-center text-gray-700"
        >
          Sign Up
        </h2>
        <div className="text-center">
          <Link
            to="/login"
            className="mt-2 text-sm font-medium text-center
            text-bb-purple transition duration-150 ease-in-out
            focus:outline-none focus:underline"
          >
            Or Login Now
          </Link>
        </div>
        <form className="mt-8" onSubmit={handleSubmit}>

          <Input
            type="text"
            label="Name"
            placeholder="Enter your Name"
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Password: (At least 8 characters, 
              must contain at least one lower-case letter, 
              one upper-case letter, one digit and a special character)"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            label="Password Confirmation"
            placeholder="Retype your password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <Button type="submit" buttonText="Register" />
        </form>
      </div>
    </div>
  );
};

export default SignupForm;