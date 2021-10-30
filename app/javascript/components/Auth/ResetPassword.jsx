import React,{useEffect, useState} from 'react'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import authApi from '../apis/auth'
import ResetPasswordForm from './ResetPasswordForm'

const ResetPassword = ({history}) => {
    const [passwordReset, setPasswordReset] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [goToRoot, setGoToRoot] = useState(false)

    function useQuery(){
        return new URLSearchParams(useLocation().search)
    }
    const query = useQuery()

    const handleSubmit = async(event) => {
        
        event.preventDefault()
        if (password !== passwordConfirmation){
            toast.error("Password Confirmation dosen't match Password")
        }
        setLoading(true)
        const token = query.get('password_reset_token')
        console.log('token',token)
        const user = {
            password,
            password_confirmation:passwordConfirmation,
        }        
        try{
            const response = await authApi.resetPassword(token,user)
            if(response){
                if(response.status === 200){
                    toast.success(response.data.notice)
                }
            }
            console.log('reset password',response)
            setMessage(response.data.notice)
            setPasswordReset(true)  
            setGoToRoot(true)          
            setLoading(false)
            toast.success(response.data.notice)
            // history.push("/login")
            history.push({
                pathname: '/login',          
                state: { goToRoot:true  }
            })
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

    // useEffect(() => {
    //     let timer;
    //     if(passwordReset){
    //         timer = setTimeout(()=>{
    //             setRedirect(true)
    //         },5000)
    //     }
    //     return () => clearTimeout(timer)
    // }, [passwordReset])

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
