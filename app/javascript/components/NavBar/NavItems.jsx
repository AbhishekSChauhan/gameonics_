import React from 'react'
import {Link} from 'react-router-dom'

import { ImHome } from "react-icons/im";
import { FaBlog, FaStarHalfAlt } from "react-icons/fa";
import { MdGames } from "react-icons/md";

const NavItems = () => {
    return (
        <div className="hidden sm:ml-7 sm:block lg:justify-center"> 
            <div className="flex flex-row sm:space-x-9 text-gray-600">
                <Link to="/" 
                    className="flex flex-row items-center transition duration-250 ease-in transform hover:text-gray-800 hover:-translate-y-1 hover:scale-110 ">                    
                    <ImHome className="mx-0.5"/>
                    <span >Home</span>
                </Link >   
                <Link to="/games" className="flex flex-row items-center transition duration-250 ease-in transform hover:text-gray-800 hover:-translate-y-1 hover:scale-110">
                    <MdGames className="mx-0.5" />
                    <span >Games</span>
                </Link >  
                <Link to="/blog" className="flex flex-row items-center transition duration-250 ease-in transform hover:text-gray-800 hover:-translate-y-1 hover:scale-110">
                    <FaBlog className="mx-0.5" />
                    <span >Blog</span>
                </Link >  
                <Link to="/" className="flex flex-row items-center transition duration-250 ease-in transform hover:text-gray-800 hover:-translate-y-1 hover:scale-110">
                    <FaStarHalfAlt className="mx-0.5" />
                    <span >Reviews</span>
                </Link >               
            </div>
        </div>
    )
}

export default NavItems



