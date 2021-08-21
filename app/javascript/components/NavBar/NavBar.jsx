import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { IoMdLogIn } from "react-icons/io";
import { AiOutlineMenuFold,AiOutlineMenuUnfold } from "react-icons/ai";
import NavItems from './NavItems';
import {AuthContext} from '../App'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";

function NavBar() {
    const UserDetails = React.useContext(AuthContext)
    const {dispatch} = React.useContext(AuthContext)
    console.log("UserDetails = ",UserDetails)

    const handleLogout=() => {
        axios.delete('/logout', { withCredentials: true})
        .then(response =>{
            if(response){
                response.success = response.status === 200;
                if (response.data.notice){
                    toast.success(response.data.notice)                  
                }
            }
            dispatch({
                type:'Logout',
            })
        })
        .catch(error => {
            if(error){
                toast.error(
                    error.response?.data?.notice ||
                    error.response?.data?.error ||
                    error.message ||
                    error.notice ||
                    "Something went wrong!"
                )
            }
            if (error.response?.status === 423) {
                window.location.href = "/";
            }
            console.log('logout error', error);
        })        
        console.log("logout clicked",UserDetails)
    }
    
    return (
        
        <header className="bg-white">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div>
                        <Link to="/" className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0 flex">
                                <span className="font-bold font-serif text-gray-700 ">Gameonics</span>
                            </div>
                            <div className="absolute inset-x-0 right-0 inline-block items-center sm:hidden pl-2">
                                <AiOutlineMenuUnfold />
                            </div>  
                        </Link>
                    </div>
                    
                    <div>
                        <NavItems />
                    </div>

                    <div>
                        {
                         UserDetails.state.isLoggedIn ? 
                            (
                            <div>Welcome {UserDetails?.state?.user?.user?.username}
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                            ) : (
                            <Link to="/login"
                                className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-4 sm:pr-0 ">
                                <div className="flex flex-row items-center text-gray-600 transition duration-150 ease-in transform hover:text-gray-800 hover:-translate-y-1 hover:scale-110">
                                    <IoMdLogIn className="mx-1" />
                                    <span>Login</span>
                                </div>
                            </Link>) 
                        }
                    </div>
                </div>
            </div>
        </header>

    )
}

export default NavBar
