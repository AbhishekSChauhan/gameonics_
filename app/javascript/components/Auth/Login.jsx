import React, { useState } from 'react'
import authApi from '../apis/auth'
// import { setAuthHeaders } from '../apis/axios'
import LoginForm from "./LoginForm"


export default function Login({history}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const res = await authApi.login({login: {email,password}});
        
        setAuthHeaders()
        setLoading(false)
        console.log(res.data)
        history.push("/")
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <LoginForm
      setEmail={setEmail}
      setPassword={setPassword}
      loading={loading}
      handleSubmit={handleLogin}
    />
  )
}
