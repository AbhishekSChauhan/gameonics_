import React, { useState } from 'react'
// import authApi from '../apis/auth'
import {Link} from 'react-router-dom'
import LoginForm from './LoginForm'
import axios from 'axios'
import {AuthContext} from '../App'

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
      } ,
      { withCredentials: true}
      )
      .then(response => {
        if(response.data.logged_in === true){
          setLoading(false)
        }
        console.log(response)
        console.log("Login success: Welcome", response.data.user.username)
        dispatch({
          type:'Login',
          payload: response.data.user.username,
        })
        history.push('/')
      })
      .catch(error=>{
        console.log("login error", error)
      })
  }

  return (
    <LoginForm 
      setEmail={setEmail}
      setPassword={setPassword}
      loading={loading}
      handleSubmit={handleSignup}
    />
  )
}

