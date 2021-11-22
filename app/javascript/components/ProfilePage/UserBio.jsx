import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { MdEdit } from "react-icons/md";
import Loader from '../Auth/Loader';


const UserBio = ({user,username,selectedUser,getBio,setGetBio}) => {
    const [bio, setBio] = useState('')
    // const [getBio, setGetBio] = useState('')
    const [loading, setLoading] = useState(false)
    const [editOpen, setEditOpen] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        try{
            const response = await axios.patch(`/users/${username}/update_bio`,{bio})
            console.log('bio',response)
            setEditOpen(false)
            setGetBio(response.data.bio)
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
                    error.message ||
                    error.notice ||
                    "Something went wrong!"
                )
            }

        }
    }

    const openEditBox = () => {
        setEditOpen(true)
    }

    const closeEditBox = () => {
        setEditOpen(false)
    }

    return (
        <div className="bg-white rounded relative shadow-sm">
            {/* <div className="flex items-center justify-center py-1 overflow-hidden mt-5">
                {(()=>{
                    if((getBio && user.bio !== "null")){
                        return <div>{getBio}</div>
                    }else if(user?.bio !== "null"){
                        return <div>{user.bio}</div>
                    } else if(getBio){
                        return <div>{getBio}</div>
                    }else {
                        return <div></div>
                    }
                })()} 
            </div> */}

            {(user.username === username) ? (
                <div>
                    {/* <MdEdit onClick={openEditBox}
                    className="hover:text-blue-700 z-10 mt-4 flex flex row text-blue-500 
                    text-2xl absolute cursor-pointer right-7 md:right-40 lg:right-60 -top-3"
                    /> */}
                    {/* Update bio
                    </button> */}
                </div>
            ):(
                null
            )}

            

            {editOpen ? (
                <form onSubmit={handleSubmit}>
                    <div className="flex items-denter justify-center">
                        <textarea
                            maxLength="200"
                            type="text"
                            name="comment"
                            className="bg-grey-lighter h-20 py-2 px-3 border border-gray-800
                            relative flex justify-center w-96 px-4 py-2 
                            leading-5 text-gray-800 transition duration-150
                            ease-in-out rounded-md"
                            value={bio}
                            onChange={(e)=>{setBio(e.target.value)}}
                        >
                            Add a bio
                        </textarea>
                    </div>

                    {/* <button type="submit" 
                    // onClick={closeEditBox}
                        className="border border-blue-700 mt-1 right-0 bg-blue-500 
                        text-white hover:bg-blue-900 py-2 px-4 rounded tracking-wide mr-1"
                    >
                        Update bio
                    </button> */}
                    <button type="submit" disabled={loading}
                        className="border border-blue-700 mt-1 right-0 bg-blue-500 text-white 
                        text-white hover:bg-blue-900 py-2 px-4 rounded tracking-wide mr-1">
                            {loading ? (
                            <div>
                                <Loader />
                            </div>
                            ) : (
                            <span>Update bio</span>
                            )}
                    </button>
                </form>
            ):(
                null
            )}

            
        </div>
    )
}

export default UserBio
