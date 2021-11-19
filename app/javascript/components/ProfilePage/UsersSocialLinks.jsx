import React, { useState } from 'react'
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const UsersSocialLinks = () => {
    const [facebook_url, setFacebook_url] = useState('')
    const [twitter_url, setTwitter_url] = useState('')
    const [instagram_url, setInstagram_url] = useState('')
    const [inputOpen, setInputOpen] = useState(false)

    const openInput = () => {
        setInputOpen(true)
    }

    return (
        <div>
            <div className="mt-3 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-center">
                <FaFacebookF onClick={openInput} />
                <FaInstagram />
                <FaTwitter />
            </div>

            {inputOpen ? (
                <input
                    required={true}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Title"
                    className="block w-full px-3 py-2 placeholder-gray-400
                    transition duration-150 ease-in-out border
                    border-gray-300 rounded-md appearance-none
                    focus:outline-none focus:shadow-outline-blue
                    focus:border-blue-300 sm:text-sm sm:leading-5"
                /> 
                
            ):(
                null
            )}

                       
        </div>
    )
}

export default UsersSocialLinks
