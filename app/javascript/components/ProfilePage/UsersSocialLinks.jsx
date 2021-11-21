import axios from 'axios';
import React, { useState } from 'react'
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Loader from '../Auth/Loader';
import toast from 'react-hot-toast';
import {Link } from 'react-router-dom'

const UsersSocialLinks = ({username, selectedUser,user}) => {
    const [facebook, setFacebook] = useState('')
    const [twitter, setTwitter] = useState('')
    const [instagram, setInstagram] = useState('')
    const [fbInputOpen, setFbInputOpen] = useState(false)
    const [tweetInputOpen, setTweetInputOpen] = useState(false)
    const [instaInputOpen, setInstaInputOpen] = useState(false)
    const [addedUrl, setAddedUrl] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(facebook){
            var facebook_url = facebook
        }else if(twitter){
            var twitter_url = twitter
        }else if(instagram){
            var instagram_url = instagram
        }
        setLoading(true)
        try{
            const response = await axios.patch(`/users/${username}/add_social_link`,
            {facebook_url, twitter_url, instagram_url})
            console.log('links',response)
            setFbInputOpen(false)
            setInstaInputOpen(false)
            setTweetInputOpen(false)
            setAddedUrl(response.data.links)
            toast.success(response.data.notice)
            setLoading(false)
        }catch(error){
            console.log("signup error",error)
            setLoading(false)
            if(error){
                toast.error(
                    error.response?.data?.notice ||
                    error.response?.data?.errors ||
                    error.response?.data?.error ||
                    "Something went wrong!"
                )
            }

        }
    }

    const openFbInput = () => {
        setFbInputOpen(true)
        setTweetInputOpen(false)
        setInstaInputOpen(false)
    }

    const openTweetInput = () => {
        setTweetInputOpen(true)
        setFbInputOpen(false)
        setInstaInputOpen(false)
    }

    const openInstaInput = () => {
        setInstaInputOpen(true)
        setFbInputOpen(false)
        setTweetInputOpen(false)
    }

    return (
        <div>
            <div className="mt-3 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-center">
                <div className="flex flex-row">          
                    

                {(user.username === username) ? (
                    <div className="flex flex-row">
                        <FaFacebookF onClick={openFbInput} className="mx-2 text-lg cursor-pointer" />
                        <FaTwitter onClick={openTweetInput} className="mx-2 text-lg cursor-pointer"/>
                        <FaInstagram onClick={openInstaInput} className="mx-2 text-lg cursor-pointer"/>
                    </div>
                ):(
                    <div className="flex flex-row items-center justify-center my-5 overflow-hidden">
                        {(selectedUser.facebook_url === null) ? (
                            null
                        ):(
                            <a href={selectedUser.facebook_url}>
                                <FaFacebookF className="mx-2 text-lg cursor-pointer" />
                            </a>
                        )}
                        {(selectedUser.twitter_url === null) ? (
                            null
                        ):(
                            <a href={selectedUser.twitter_url}>
                                <FaTwitter className="mx-2 text-lg cursor-pointer" />
                            </a>
                        )}
                        {(selectedUser.instagram_url === null) ? (
                            null
                        ):(
                            <a href={selectedUser.instagram_url}>
                                <FaInstagram className="mx-2 text-lg cursor-pointer" />
                            </a>
                        )}
                    </div>            
                )}
                </div>                
            </div>


            <div>
            {fbInputOpen ? (                 
                <form onSubmit={handleSubmit}>
                    <div className="flex items-denter justify-center">
                    <input
                        required={true}
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                        placeholder="Enter your Facebook account link"
                        className="block w-full px-3 py-2 placeholder-gray-400
                        transition duration-150 ease-in-out border
                        border-gray-300 rounded-md appearance-none
                        focus:outline-none focus:shadow-outline-blue
                        focus:border-blue-300 sm:text-sm sm:leading-5"
                    /> 
                    </div>
                    <button type="submit" disabled={loading}
                        className="border border-blue-700 mt-1 right-0 bg-blue-500 text-white 
                        text-white hover:bg-blue-900 py-2 px-4 rounded tracking-wide mr-1">
                            {loading ? (
                            <div>
                                <Loader />
                            </div>
                            ) : (
                            <span>Add</span>
                            )}
                    </button>
                </form>              
            ):(
                null
            )}
            </div>

            <div>
            {tweetInputOpen ? (                 
                <form onSubmit={handleSubmit}>
                    <div className="flex items-denter justify-center">
                    <input
                        required={true}
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        placeholder="Enter your Twitter account link"
                        className="block w-full px-3 py-2 placeholder-gray-400
                        transition duration-150 ease-in-out border
                        border-gray-300 rounded-md appearance-none
                        focus:outline-none focus:shadow-outline-blue
                        focus:border-blue-300 sm:text-sm sm:leading-5"
                    /> 
                    </div>
                    <button type="submit" disabled={loading}
                        className="border border-blue-700 mt-1 right-0 bg-blue-500 text-white 
                        text-white hover:bg-blue-900 py-2 px-4 rounded tracking-wide mr-1">
                            {loading ? (
                            <div>
                                <Loader />
                            </div>
                            ) : (
                            <span>Add</span>
                            )}
                    </button>
                </form>              
            ):(
                null
            )}
            </div>

            <div>
            {instaInputOpen ? (                 
                <form onSubmit={handleSubmit}>
                    <div className="flex items-denter justify-center">
                    <input
                        required={true}
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="Enter your Instagram account link"
                        className="block w-full px-3 py-2 placeholder-gray-400
                        transition duration-150 ease-in-out border
                        border-gray-300 rounded-md appearance-none
                        focus:outline-none focus:shadow-outline-blue
                        focus:border-blue-300 sm:text-sm sm:leading-5"
                    /> 
                    </div>
                    <button type="submit" disabled={loading}
                        className="border border-blue-700 mt-1 right-0 bg-blue-500 text-white 
                        text-white hover:bg-blue-900 py-2 px-4 rounded tracking-wide mr-1">
                            {loading ? (
                            <div>
                                <Loader />
                            </div>
                            ) : (
                            <span>Add</span>
                            )}
                    </button>
                </form>              
            ):(
                null
            )}
            </div>
                       
        </div>
    )
}

export default UsersSocialLinks
