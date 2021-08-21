import React, { useState } from 'react'
// import authApi from '../apis/auth'
import {Link} from 'react-router-dom'
import SignupForm from './SignupForm'
import axios from 'axios'
import {AuthContext} from '../App'
import toast, { Toaster } from "react-hot-toast";


export default function Signup({history}) {
  const {dispatch} = React.useContext(AuthContext)
  
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [registrationErrors, setSegistrationErrors] = useState("")

  
  const handleSignup = (event) => {
    event.preventDefault();
    setLoading(true)
    axios.post("/registrations", {
        user:{
          username,
          email,
          password,
          password_confirmation: passwordConfirmation
        }
      } ,
      { withCredentials: true}
      )
      .then(response => {
        if(response.data.status === 'created'){
          setLoading(false)
        }
        if(response){
          response.success = response.status === 200;
          if (response.data.notice){
              toast.success(response.data.notice)                  
          }
        }
        console.log("registration success", response)
        dispatch({
          type:'Signup',
          payload: response.data.user.username,
        })
        history.push('/login')
      })
      .catch(error=>{
        if(error){
          console.log("Signup error", error)
          // const err = Object.entries(error);
          // err.map(
            toast.error(
              error.response?.data?.notice ||
              error.response?.data?.error ||
              error.response?.data?.username_error ||
              error.response?.data?.email_error ||
              error.response?.data?.password_error ||
              error.response?.data?.passwordConf_error ||
              "Something went wrong!"
          )
        // )          
      }
      if (error.response?.status === 423) {
          window.location.href = "/";
      }
        console.log("registration error", error)
      })
  }

  return (
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

