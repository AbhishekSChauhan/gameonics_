import React, { useState } from 'react'
// import authApi from '../apis/auth'
import {Link} from 'react-router-dom'
import SignupForm from './SignupForm'
import axios from 'axios'
import {AuthContext} from '../App'
import toast, { Toaster } from "react-hot-toast";
import authApi from '../apis/auth'
import ConfirmPage from './ConfirmPage'


export default function Signup({history}) {
  const {dispatch} = React.useContext(AuthContext)
  
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

    authApi.signup(user)
    .then(response => {
      if(response.data.status === 'created'){
        setLoading(false)
        setEmailConfirm(true)
        setUserCreds({ username: username.trim(), email: email.trim() });
        toast.success(response.data.notice)  
      }
      history.push("/")
    })
    console.log("resgister res",response)
      
    // .then(response => {
    //     if(response.data.status === 'created'){
    //       setLoading(false)
    //     }
    //     console.log("registration success", response)
    //     dispatch({
    //       type:'Signup',
    //       payload: response.data.user.username,
    //     })
    //     history.push('/login')
    //   })
    .catch(error=>{
        if(error){
          console.log("Signup error", error)
          
          toast.error(
            error.response?.data?.notice ||
            error.response?.data?.error ||
            error.response?.data?.errors ||
            "Something went wrong!"
          )
      }
      console.log("registration error", error)
    })
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

