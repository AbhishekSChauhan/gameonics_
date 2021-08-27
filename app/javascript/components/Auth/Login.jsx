import React, { useState } from 'react'
// import authApi from '../apis/auth'
import {Link} from 'react-router-dom'
import LoginForm from './LoginForm'
import axios from 'axios'
import {AuthContext} from '../App'
import toast, { Toaster } from "react-hot-toast";
import authApi from '../apis/auth'

export default function Login({handleLogin}) {
  const {dispatch} = React.useContext(AuthContext)
  
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [credential, setCredential] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { username: credential, email:credential, password}

    setLoading(true)
    authApi.login(user)
    .then(response => {
        if(response.data.status === 'created'){
          const retrievedUser = response.data.user
          sessionStorage.setItem('user',JSON.stringify({ ...retrievedUser }))
          handleLogin(retrievedUser)
          setLoading(false)
          toast.success(response.data.notice)          
          // dispatch({
          //   type:'Login',
          //   payload: response.data,
          // })
        }
        console.log(response)
        // console.log("Login success: Welcome", response.data.user.username)
        
      })
      .catch(error=>{
        if(error){
          toast.error(
              error.response?.data?.notice ||
              error.response?.data?.error ||
              error.response?.data?.errors ||
              error.message ||
              error.notice ||
              "Something went wrong!"
          )
        }
        console.log("login error", error)
      })
  }

  return (
    <div>
      <LoginForm 
        setCredential={setCredential}
        setPassword={setPassword}
        loading={loading}
        handleSubmit={handleSubmit}
      />

    </div>
    
  )
}

