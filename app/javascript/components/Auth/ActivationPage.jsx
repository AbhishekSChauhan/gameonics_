import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useLocation,useHistory } from 'react-router-dom'
import toast from 'react-hot-toast'
import authApi from '../apis/auth'
import Loader from './Loader'

const ActivationPage = () => {
    const [activated, setActivated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState('')

    const history = useHistory()

    function useQuery(){
        return new URLSearchParams(useLocation().search)
    }
    const query = useQuery()

    const handleActivateClick = async(event) => {
        event.preventDefault()
        setLoading(true)
        // const user_id = query.get('id')
        const activation_key = query.get('activation_key')
        const user_id = activation_key.substring(0,2)
        console.log('user_id',user_id)
        console.log('token',activation_key)
        try{
            const response = await authApi.activateAccount(user_id,activation_key)
            console.log("activate account",response)
            setActivated(true)
            setUser(response.data.username)
            setLoading(false)
            toast.success(response.data.notice)
            history.push('/login')
        }catch(error){
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

    return (
        <div className="flex flex-col h-screen items-center">
            <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto
                md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
                flex items-center justify-center">
                    
                <div className="w-full h-96 text-gray-500">
                    <div>
                    <span className="text-lg text-gray-700 md:text-2xl font-bold leading-tight">
                        Congratulations
                    </span>
                    </div>
                    <div className="mt-2">
                    <span className="text-md text-gray-700 md:text-2xl font-semibold leading-tight">
                        You  confirmed your account and just one step away from activating your account
                    </span>
                    </div>
                </div>
                <button type="submit" disabled={loading}
                    onClick={handleActivateClick}
                    className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white
                        font-semibold rounded-lg px-4 py-3 mt-6">
                        {loading ? (
                            <div>
                            <Loader />
                            </div>
                        ) : (
                            <span>Click to activate</span>
                        )}
                </button>
            </div>
        </div>
    )
}

export default ActivationPage
