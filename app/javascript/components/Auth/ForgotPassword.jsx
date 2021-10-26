import React, { useState } from 'react'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [notice, setNotice] = useState('')

    const handleSubmit = async(event) => {
        event.preventDefault()
        const emailTrim = email.trim()
        setLoading(true)
        try{
            const response = await authApi.forgotPassword({emailTrim})
            if(response.status === 200){
                toast.success(response.data.notice)

            }
            setNotice(response.data.notice) 
            setEmailSent(true)
            setLoading(false)
        }catch(error) {
            console.log("forgot pass error",error)
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

    return emailSent ? (
        <div className="bg-white">
            <div className="max-w-6xl mx-auto mt-10">
                <div className="relative max-w-4xl mx-auto items-center justify-between">
                    <div className="flex flex-col ">
                        {notice}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="bg-white">
            <div className="max-w-6xl mx-auto mt-10">
                <div className="relative max-w-4xl mx-auto items-center justify-between">
                    <div className="flex flex-col ">
                    <h2 className="text-center mb-1">Send Password Reset Email</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h4>Email</h4>
                        <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        minLength="3"
                        required
                        />
                        <button type="submit">Send Email</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>        
    )
}

export default ForgotPassword
