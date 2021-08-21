import React, { useState } from 'react'
// import authApi from '../apis/auth'
import {Link} from 'react-router-dom'
import LoginForm from './LoginForm'
import axios from 'axios'
import {AuthContext} from '../App'
import toast, { Toaster } from "react-hot-toast";

export default function Login({history}) {
  const {dispatch} = React.useContext(AuthContext)
  
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginErrors, setLoginErrors] = useState("")
  
  const handleSignup = (event) => {
    event.preventDefault();
    setLoading(true)
    axios.post("/sessions", {
        user:{
          email,
          password,
        }
      } ,{ withCredentials: true}
      )
      .then(response => {
        if(response.data.status === 'created'){
          setLoading(false)
          dispatch({
            type:'Login',
            payload: response.data,
          })
          history.push('/')
        }
        if(response){
            response.success = response.status === 200;
            if (response.data.notice){
                toast.success(response.data.notice)                  
            }
        }
        console.log(response)
        // console.log("Login success: Welcome", response.data.user.username)
        
      })
      .catch(error=>{
        if(error){
          toast.error(
              error.response?.data?.notice ||
              error.response?.data?.error ||
              error.message ||
              error.notice ||
              "Something went wrong!"
          )
      }
      if (error.response?.status === 423) {
          window.location.href = "/";
      }
        console.log("login error", error)

      })
  }

  return (
    <div>
      <LoginForm 
        setEmail={setEmail}
        setPassword={setPassword}
        loading={loading}
        handleSubmit={handleSignup}
      />

    </div>
    
  )
}

