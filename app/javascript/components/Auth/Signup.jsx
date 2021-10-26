import React, { useState } from 'react'
import SignupForm from './SignupForm'
import toast, { Toaster } from "react-hot-toast";
import authApi from '../apis/auth'
import ConfirmPage from './ConfirmPage'


export default function Signup({history}) {  
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [emailConfirm, setEmailConfirm] = useState(false)
  const [userCreds, setUserCreds] = useState({});

 const handleSignup = async (event) => {
    event.preventDefault();
    setLoading(true)
    const user = {
      username: username.trim(),
      email: email.trim(),
      password,
      password_confirmation:passwordConfirmation,
    }
    try{
      const response = await authApi.signup({user})
      if(response){
        if(response.data.status === 'created'){
          toast.success(response.data.notice)  
        }       
      }
      setEmailConfirm(true)
      setUserCreds({ username: username.trim(), email: email.trim() });
      console.log('signup',response)
      setLoading(false)
    }catch(error) {
      console.log("signup error",error)
      setLoading(false)
      if(error){
          toast.error(
              error.response?.data?.notice ||
              error.response?.data?.errors ||
              error.response?.data?.error ||
              error.message ||
              error.notice ||
              "Something went wrong!"
          )
      }
    }
  }

  return emailConfirm ? <ConfirmPage user={userCreds} />
  : (
    <div>      
      <SignupForm 
        setUsername = {setUsername}
        setEmail={setEmail}
        setPassword={setPassword}
        setPasswordConfirmation={setPasswordConfirmation}
        handleSubmit={handleSignup}
        loading={loading}
      />
    </div>
    
  )
}

