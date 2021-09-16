import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import LoginForm from './LoginForm'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";
import authApi from '../apis/auth'
import { useHistory } from 'react-router-dom'

export default function Login({handleLogin}) {
  const history = useHistory()
  
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [credential, setCredential] = useState('');
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    const user = { username: credential, email:credential, password}

    setLoading(true)
    try{
      const response = await authApi.login({user})
      if(response){
        if(response.data.status === 'created'){
          toast.success(response.data.notice)  
        }       
      }
      const retrievedUser = response.data.user
      sessionStorage.setItem('user',JSON.stringify({ ...retrievedUser }))
      handleLogin(retrievedUser)
      setLoading(false)
      console.log("login res",response)
      history.push("/")
    }catch(error) {
      console.log("login error",error)
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

