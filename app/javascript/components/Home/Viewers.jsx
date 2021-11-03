import React from 'react'
import {Link} from "react-router-dom";
function Viewers() {
    return (
        <div className="">
            <div className=" mx-12 my-12 grid grid-cols-5 gap-x-12">
                <Link to="/" className="border-2 border-solid border-gray-500 rounded-lg shadow-lg hover:border-purple-900 transition  duration-250 ease-in transform hover:-translate-y-1 hover:scale-110 ">
                    <img src="https://www.logo.wine/a/logo/PlayStation/PlayStation-Logo.wine.svg" />
                </Link>
                <Link to="/" className="border-2 border-solid border-gray-500 rounded-lg shadow-lg hover:border-purple-900 transition  duration-250 ease-in transform hover:-translate-y-1 hover:scale-110">
                    <img src="https://www.logo.wine/a/logo/Xbox/Xbox-Logo.wine.svg" />
                </Link>
                <Link to="/" className="border-2 border-solid border-gray-500 rounded-lg shadow-lg hover:border-purple-900 transition  duration-250 ease-in transform hover:-translate-y-1 hover:scale-110">
                    <img src="https://www.pikpng.com/pngl/m/232-2322837_mobile-icon-free-download-onlinewebfonts-com-file-mobile.png"/>
                </Link>
                <Link to="/" className="border-2 border-solid border-gray-500 rounded-lg shadow-lg hover:border-purple-900 transition  duration-250 ease-in transform hover:-translate-y-1 hover:scale-110">
                    <img src="https://www.logo.wine/a/logo/Wii_U/Wii_U-Logo.wine.svg" />
                </Link>
                <Link to="/" className="border-2 border-solid border-gray-500 rounded-lg shadow-lg hover:border-purple-900 transition  duration-250 ease-in transform hover:-translate-y-1 hover:scale-110">
                    <img src="https://www.logo.wine/a/logo/PCMag/PCMag-Logo.wine.svg" />
                </Link>
            </div>  
        </div>
    )
}

export default Viewers
