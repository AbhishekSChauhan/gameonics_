import React, { useState } from 'react'
// import authApi from '../apis/auth'
import {Link} from 'react-router-dom'
import SignupForm from './SignupForm'
import axios from 'axios'
import {AuthContext} from '../App'

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
        console.log("registration success", response)
        console.log(response.data.user.username)
        dispatch({
          type:'Signup',
          payload: response.data.user.username,
        })
        history.push('/login')
      })
      .catch(error=>{
        console.log("registration error", error)
      })
  }

  return (
    <SignupForm 
      setUsername = {setUsername}
      setEmail={setEmail}
      setPassword={setPassword}
      setPasswordConfirmation={setPasswordConfirmation}
      handleSubmit={handleSignup}
      loading={loading}
    />
  )
}

