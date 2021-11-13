import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useLocation,useHistory, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import authApi from '../apis/auth'
import Loader from './Loader'

const ActivationPage = ({user}) => {
    const [activated, setActivated] = useState(false)
    const [loading, setLoading] = useState(false)
    // const [user, setUser] = useState('')
    
    console.log('user',user)

    const history = useHistory()

    function useQuery(){
        return new URLSearchParams(useLocation().search)
    }
    const query = useQuery()
    console.log('activation_key_query',query)
    
    const activation_key = query.get('activation_key')
    console.log('activation_key',activation_key)


    function getQueryVariable(variable)
    {
        var query = window.location.search.substring(1);
        console.log('query',query)
        var vars = query.split("&amp;");
        console.log("vars",vars) 
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            console.log('pair',pair)
            if(pair[0] == variable){
                return pair[1]
            }
        }
        return(false);
    }

    // const activation_key = getQueryVariable('activation_key')
    const user_id = getQueryVariable('id')
    console.log('user id',user_id)


    const handleActivateClick = async(event) => {
        event.preventDefault()
        setLoading(true)
        try{
            const response = await authApi.activateAccount(user_id,activation_key)
            console.log("activate account",response)
            setActivated(true)
            // setUser(response.data.username)
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
                    <div>
                        {activation_key ? (
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
                                <div>
                                    <button type="submit" disabled={loading}
                                        onClick={handleActivateClick}
                                        className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400
                                            text-white text-center font-semibold rounded-lg px-4 py-3 mt-6">
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
                        ):(
                            <div>
                                {(user.logged_in) ? (
                                    <div>
                                    {user.is_activated ? (
                                        <div className="w-full h-96 text-gray-500">        
                                            <div>                
                                                <span className="text-lg text-gray-700 md:text-2xl font-bold leading-tight">
                                                    {user.username}
                                                </span>
                                                <div className="text-md text-gray-700 md:text-2xl font-semibold leading-tight">
                                                    Your account is already activated
                                                </div>
                                            </div>
                                        </div>
                                    ):(
                                        <div className="w-full h-96 text-gray-500">        
                                            <div>                
                                                <div className="text-md text-gray-700 md:text-2xl font-semibold leading-tight">
                                                    Your account is not activated
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    </div>
                                ) : (
                                    <div className="w-full h-96 text-gray-500">        
                                        <div className="text-md text-gray-700 md:text-2xl font-semibold leading-tight">
                                            Login to check your activation status
                                        </div> 
                                        <Link to="/login" 
                                            className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-center text-white
                                                font-semibold rounded-lg px-4 py-3 mt-6">
                                            Login
                                        </Link>                                               
                                    </div>
                                )}
                            </div>
                        )}
                    </div>               
            </div>
        </div>
    )
}

export default ActivationPage
