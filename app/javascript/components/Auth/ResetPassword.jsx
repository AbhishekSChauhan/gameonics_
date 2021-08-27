import React,{useEffect, useState} from 'react'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import authApi from '../apis/auth'
import ResetPasswordForm from './ResetPasswordForm'

const ResetPassword = ({history}) => {
    const [passwordReset, setPasswordReset] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [loading, setLoading] = useState(false)
    function useQuery(){
        return new URLSearchParams(useLocation().search)
    }
    const query = useQuery()

    const handleSubmit = () => {
        if (password !== passwordConfirmation){
            toast.error("Password Confirmation dosen't match Password")
        }

        const token = query.get('token')
        const user = {password,passwordConfirmation}
        setLoading(true)
        authApi.resetPassword(token,user)
        .then(response=>{
            if(response.status === 200){
                setPasswordReset(true)
                toast.success(response.data.notice)
                setLoading(false)
                history.push("/login")
            }
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
            console.log("reset error", error)
          })
    }


    return (
        <div>
            <ResetPasswordForm 
                setPasswordConfirmation={setPasswordConfirmation}
                setPassword={setPassword}
                loading={loading}
                handleSubmit={handleSubmit}
            />
            
        </div>
    )
}

export default ResetPassword
