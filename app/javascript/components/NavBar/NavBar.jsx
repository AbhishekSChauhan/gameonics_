import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { IoMdLogIn } from "react-icons/io";
import NavItems from './NavItems';
import Dropdown from './ProfileDropdown';
import MenuDropdown from './MenuDropdown';

function NavBar({handleLogout,user,setUser}) {

    return (
        
        <header className="bg-white">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="mx-auto ml-0 sm:mr-5">
                        <div className="flex-shrink-0 flex">
                            <div className="relative inline-block items-center sm:hidden">
                                <MenuDropdown />
                            </div>
                            <Link to="/" className="font-bold font-serif text-gray-700 ml-1
                                flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                Gameonics
                            </Link>
                        </div>                              
                    </div>
                    
                    <div className="mx-auto">
                        <NavItems />
                    </div>

                    <div className="mx-auto ml-1 sm:mr-5">
                        {
                         user.logged_in ? 
                            (   
                                <div>
                                    <Dropdown handleLogout={handleLogout} user={user} setUser={setUser} />
                                </div>
                            ) : (
                            <Link to="/login"
                                className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto mr-5 pr-1 sm:ml-4 sm:pr-0 ">
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
