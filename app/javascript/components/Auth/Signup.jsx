import React, { useState } from 'react'
import authApi from '../apis/auth'
import {Link} from 'react-router-dom'
import SignupForm from './SignupForm'
export default function Signup({changePage, history}) {
  const [signupUnsuccessful, setSignupUnsuccessful] = useState(false)
  const errorClass = signupUnsuccessful ? " " : "hidden"
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const updateSignupError = () => {
    setSignupUnsuccessful: true
  }
  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await authApi.signup({
        user:{
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });
      setLoading(false);
      history.push("/login");
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }

  return (
    <SignupForm 
      setEmail={setEmail}
      setPassword={setPassword}
      setPasswordConfirmation={setPasswordConfirmation}
      loading={loading}
      handleSubmit={handleSignup}
    />
  )
}

