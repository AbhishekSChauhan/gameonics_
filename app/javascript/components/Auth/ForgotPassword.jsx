import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Loader from './Loader'
import { VscAccount } from "react-icons/vsc";
import authApi from '../apis/auth';


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
            const response = await authApi.forgotPassword(emailTrim)
            console.log(response)
            setNotice(response.data.notice) 
            setEmailSent(true)
            setLoading(false)
            if(response.status === 200){
                toast.success(response.data.notice)
            }
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
        <div className="flex flex-col h-screen items-center">
            <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto
                md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
                flex items-center justify-center">
                <div className="w-full h-96">
                    <h2 className="text-lg text-gray-600 md:text-2xl font-bold leading-tight">{notice}</h2>
                </div>
            </div>
        </div>
    ) : (
        <div>
        <div className="flex flex-col h-screen items-center">
            <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto
                md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
                flex items-center justify-center">
                <div className="w-full h-96">
                    <h1 className="text-xl md:text-2xl font-bold leading-tight">Send Password Reset Email</h1>
                        <form className="mt-6" onSubmit={handleSubmit} >      
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                    <VscAccount className="text-gray-400 text-lg"/>
                                    </div>
                                    <input onChange={e => setEmail(e.target.value)} value={email} 
                                    placeholder="Enter your registered email id" 
                                    className="w-full py-3 -ml-10 pl-10 pr-3 rounded-lg bg-gray-200  
                                    border items-center focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus required />
                                </div>
                            </div>
                            <button type="submit" disabled={loading}
                                className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white
                                    font-semibold rounded-lg px-4 py-3 mt-6">
                                    {loading ? (
                                        <div>
                                        <Loader />
                                        </div>
                                    ) : (
                                        <span>Send Email</span>
                                    )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>       
    )
}

export default ForgotPassword
