import React, { useState, useEffect,Fragment } from 'react'
import toast from 'react-hot-toast'
import usersApi from '../apis/users'
import axios from "axios";
import PageLoader from '../PageLoader'
import BlogsDashboard from '../Blogs/BlogsDashboard';
import { FaUser } from 'react-icons/fa'
import ImageUploadModal from './ImageUploadModal';
import { useParams, Link, useHistory, useLocation } from 'react-router-dom'
import { AiOutlineMail } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

import MyBlogs from './MyBlogs';
import BookmarkedView from './BookmarkedView';
import Tabs from './Tabs';
import Loader from '../Auth/Loader';
import Follow from '../Follow/Follow';
import { VscAccount } from "react-icons/vsc";

const EditProfile = ({
    user,
}) => {
    let history = useHistory()
    let location = useLocation()
    // const {username} = useParams() //ex.. username is of selected user
    const selectedUser = location.state.selectedUser

    const [profileImage, setProfileImage] = useState()
    const [getBio, setGetBio] = useState('')
    const [username, setUsername] = useState(selectedUser.username)
    const [bio, setBio] = useState(selectedUser.bio)
    const [facebook_url, setFacebook_url] = useState(selectedUser.facebook_url)
    const [twitter_url, setTwitter_url] = useState(selectedUser.twitter_url)
    const [instagram_url, setInstagram_url] = useState(selectedUser.instagram_url)

    const [email, setEmail] = useState("")


    const [loading, setLoading] = useState(false)
    const [uploadLoading, setUploadLoading] = useState(false)
    const [showLoader, setShowLoader] = useState(false)
    const [selectedUserImage, setSelectedUserImage] = useState('')

    

    // facebook_url = selectedUser.facebook_url
    // twitter_url = selectedUser.twitter_url
    // instagram_url = selectedUser.instagram_url
    // bio = selectedUser.bio
    
    const handleCheckFileSize = e => {
        const elem = e.target;
        if (elem.files[0].size > 1048576) {
            elem.value = '';
            toast.error('Size is more than 1 MB')
        } else 
        { 
          setProfileImage(elem.files[0]); 
        }
    };

    const handleProfileImageSubmit = async(e) => {
        e.preventDefault()
        setUploadLoading(true)
        const formData = new FormData()
        formData.append('user[profile_image]',profileImage)
        try{
          setUploadLoading(true)
          const response = await usersApi.userImage(selectedUser.username,formData)
          if(response.status === 200){
            toast.success(response.data.notice)
          }
          console.log('image post',response)
          setSelectedUserImage(response.data.profile_image_url)
          setUploadLoading(false)
        }catch(error) {
          console.log("signup error",error)
          setUploadLoading(false)
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

   

    useEffect(()=>{
        // selectedUser = location.state.selectedUser
        console.log('selectedUser',selectedUser)

        window.scrollTo({
          top:0,
          behavior:"smooth"
        })

        if(uploadLoading){
          setShowLoader(true)
        }

        if(!uploadLoading && showLoader){
          const timeout = setTimeout(()=> {
            setShowLoader(false)
          },600)

          return () => {
            clearTimeout(timeout)
          }
        }        
    },[selectedUser.username,location])



    if (loading) {
      return (
        <div className="h-screen">
          <PageLoader />
        </div>
      );
    }

    const handleSubmit = async()=>{
        try{
            setLoading(true)
            const response = await axios.patch(`/users/${selectedUser.username}/update_profile`,{
                    username,
                    bio,
                    facebook_url,
                    instagram_url,
                    twitter_url                
            })
            console.log('profile update',response)
            history.push(`/user/${selectedUser.username}`)            
            toast.success(response.data.notice)            
        }catch(error){
          console.log("profile edit error",error)
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
        <div className="max-w-6xl flex items-center overflow-hidden h-auto flex-wrap mx-auto my-4 lg:my-4">
          <div className="w-full rounded-lg shadow-2xl bg-white lg:mx-0">
            <div className="text-center">
                <div className="relative">
                  {uploadLoading ? (
                    <div>
                      <Loader />
                    </div>
                  ):(
                    <div>
                      {(()=>{
                          if(!selectedUser.profile_image){
                              return <FaUser className="block rounded-full shadow-xl mx-auto h-48 w-48 text-gray-500 bg-cover bg-center" />
                          }else if(selectedUser.profile_image && selectedUserImage){
                              return <img className="block rounded-full shadow-xl mx-auto h-48 w-48 bg-cover bg-center"
                              src={selectedUserImage} />
                          }else {
                            return <img className="block rounded-full shadow-xl mx-auto h-48 w-48 bg-cover bg-center"
                            src={selectedUser.profile_image} />
                        }
                      })()}
                    </div>
                  )}

                  {(user.username === selectedUser.username) ? (
                  <div>
                    <ImageUploadModal 
                      handleImageSubmit={handleProfileImageSubmit}
                      handleCheckFileSize={handleCheckFileSize}
                      uploadLoading={uploadLoading}
                      value="profile"
                    />        
                  </div> 
                ):(
                  null
                )}                         
                </div>                

            <form className="mt-1" onSubmit={handleSubmit} >

                <div className="flex flex-col items-center mt-12">                
                    <label className="block text-gray-700">Username</label>
                    <div className="flex">                
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <VscAccount className="text-gray-400 text-lg"/>
                    </div>
                    <input  
                    placeholder="Update your username" 
                    value={username}
                    disabled={true}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-96 py-3 -ml-10 pl-10 pr-3 rounded-lg bg-gray-200  
                    border items-center focus:border-blue-500 focus:bg-white focus:outline-none" />
                    </div>
                </div>                       

                <div className="flex flex-col items-center mt-4">                
                    <label className="block text-gray-700">Email Address</label>
                    <div className="flex">                
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <AiOutlineMail className="text-gray-400 text-lg"/>
                    </div>
                    <input type="text" 
                    placeholder="Email Address" 
                    // defaultValue={selectedUser.email}
                    value={selectedUser.email}
                    disabled={true}
                    className="w-96 py-3 -ml-10 pl-10 pr-3 rounded-lg bg-gray-200  
                    border items-center focus:border-blue-500 focus:bg-white focus:outline-none"  />
                    </div>
                </div>
        
                <div>              
                    <div className="flex flex-col items-center mt-4">
                    <label className="block text-gray-700">Enter your bio</label>
                        <textarea
                            maxLength="200"
                            type="text"
                            name="bio"
                            className="h-20 border border-gray-800 relative flex justify-center
                                        w-96 px-4 rounded-lg bg-gray-50 border items-center 
                                        focus:border-blue-500 focus:bg-white focus:outline-none"
                            value={bio}
                            // placeholder={bio}
                            onChange={(e)=>{setBio(e.target.value)}}
                        >
                            Add a bio
                        </textarea>
                    </div>
                </div>            

                <div className="flex flex-col items-center mt-4">
                    <label className="block text-gray-700">Add your facebook account link</label>
                    <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <FaFacebookF className="text-gray-400 text-lg"/>
                    </div>
                    <input  onChange={(e) => setFacebook_url(e.target.value)}
                    placeholder="Enter your facebook account link" 
                    // defaultValue={facebook_url}
                    value={facebook_url}
                    className="w-96 py-3 -ml-10 pl-10 pr-3 rounded-lg bg-gray-50  
                    border items-center focus:border-blue-500 focus:bg-white focus:outline-none"  />
                    </div>
                </div>

                <div className="flex flex-col items-center mt-4">
                    <label className="block text-gray-700">Add your Twitter account link</label>
                    <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <FaTwitter className="text-gray-400 text-lg"/>
                    </div>
                    <input  onChange={(e) => setTwitter_url(e.target.value)}
                    placeholder="Enter your Twitter account link" 
                    // defaultValue={twitter_url}
                    value={twitter_url}
                    className="w-96 py-3 -ml-10 pl-10 pr-3 rounded-lg bg-gray-50  
                    border items-center focus:border-blue-500 focus:bg-white focus:outline-none"  />
                    </div>
                </div>

                <div className="flex flex-col items-center mt-4">
                    <label className="block text-gray-700">Add your Instagram account link</label>
                    <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <FaInstagram className="text-gray-400 text-lg"/>
                    </div>
                    <input  onChange={(e) => setInstagram_url(e.target.value)}
                    placeholder="Enter your instagram account link" 
                    // defaultValue={instagram_url}
                    value={instagram_url}
                    className="w-96 py-3 -ml-10 pl-10 pr-3 rounded-lg bg-gray-50  
                    border items-center focus:border-blue-500 focus:bg-white focus:outline-none"  />
                    </div>
                </div>

                <div className="flex justify-center">
                  <button type="submit" disabled={loading}
                      className="flex justify-center w-96 block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 
                      text-white font-semibold rounded-lg px-4 py-3 mt-6">
                      {loading ? (
                          <div>
                          <Loader />
                          </div>
                      ) : (
                          <span>Update</span>
                      )}
                  </button>
                </div>
            </form>
                                           
            </div>
          </div>
        </div>
     
     
    )
}

export default EditProfile
