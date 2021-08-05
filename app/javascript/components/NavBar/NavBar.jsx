import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { IoMdLogIn } from "react-icons/io";
import { AiOutlineMenuFold,AiOutlineMenuUnfold } from "react-icons/ai";
import NavItems from './NavItems';

function NavBar({loggedIn, name, imageUrl}) {
    
    return (
        <header className="bg-white">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    

                    <Link to="/" className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex">
                            <span className="font-bold font-serif text-gray-700 ">Gameonics</span>
                        </div>

                        <div className="absolute inset-x-0 right-0 inline-block items-center sm:hidden pl-2">
                            <AiOutlineMenuUnfold />
                        </div>  

                        <NavItems />
                    </Link>

                    <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-4 sm:pr-0 ">
                        {loggedIn ?(
                            <>
                            <Link to={handleLogout}>Logout</Link>
                            </>
                        ):(
                        <Link to="/login">Login</Link>
                        )}
                    </div>
                    
                    {/* <Link to="/login"
                    className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-4 sm:pr-0 ">
                        <a className="flex flex-row items-center text-gray-600 transition duration-150 ease-in transform hover:text-gray-800 hover:-translate-y-1 hover:scale-110">
                            <IoMdLogIn className="mx-1" />
                            <span>Login</span>
                        </a>
                    </Link> */}
                </div>
            </div>
        </header>

    )
}

export default NavBar
