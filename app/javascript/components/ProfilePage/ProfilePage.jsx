import React, { useState, useEffect,Fragment } from 'react'
import toast from 'react-hot-toast'
import usersApi from '../apis/users'
import axios from "axios";
import PageLoader from '../PageLoader'
import BlogsDashboard from '../Blogs/BlogsDashboard';
import { FaUser } from 'react-icons/fa'
import ImageUploadModal from './ImageUploadModal';
import { useParams, Link, useHistory } from 'react-router-dom'

import MyBlogs from './MyBlogs';
import BookmarkedView from './BookmarkedView';
import Tabs from './Tabs';
import Loader from '../Auth/Loader';
import Follow from '../Follow/Follow';
import UserBio from './UserBio';
import UsersSocialLinks from './UsersSocialLinks';

const ProfilePage = ({
    user, handleLogout, handleBlogSelect,
}) => {
    let history = useHistory()
    const {username} = useParams()

    const [selectedUser, setSelectedUser] = useState({})
    const [publishedBlogs, setPublishedBlogs] = useState([])
    const [draftBlogs, setDraftBlogs] = useState([])
    const [bookmarkedBlogs, setBookmarkedBlogs] = useState([])
    const [profileImage, setProfileImage] = useState()
    const [receivedFollows, setReceivedFollows] = useState([])
    const [givenFollows, setGivenFollows] = useState([])
    // const [followingCount, setFollowingCount] = useState(0)
    // const [followerCount, setFollowerCount] = useState(0)
    const [getBio, setGetBio] = useState('')


    const [loading, setLoading] = useState(false)
    const [uploadLoading, setUploadLoading] = useState(false)
    const [showLoader, setShowLoader] = useState(false)
    const handleSelectedUser = user => {
        setSelectedUser(user)
    }

    const showAllUsers = async() => {
      setLoading(true)
      try{
        const response = await axios.get('/users')
        setLoading(false)
        console.log('All user details',response)
      }catch(error){
          if(error){
            toast.error(
                error.response?.data?.notice ||
                error.response?.data?.error ||
                error.response?.data?.errors ||
                error.message ||
                error.notice ||
                "Something went wrong!"
            )
          }
          console.log("login error", error)
          setLoading(false)
      }

    }

    const fetchUserDetails = async() =>{
      setLoading(true)
      const userID = user.id
      try{
        const response = await usersApi.fetchUser(username)
        setSelectedUser(response.data.user)
        setPublishedBlogs(response.data.published_blogs)
        setDraftBlogs(response.data.draft_blogs)
        setBookmarkedBlogs(response.data.bookmarked)
        setReceivedFollows(response.data.received_follows)
        setGivenFollows(response.data.given_follows)
        // setFollowingCount(response.data.followinG)
        // setFollowerCount(response.data.followerS)
        setLoading(false)
        console.log('user details',response)
      }catch(error){
          if(error){
            toast.error(
                error.response?.data?.notice ||
                error.response?.data?.error ||
                error.response?.data?.errors ||
                error.message ||
                error.notice ||
                "Something went wrong!"
            )
          }
          console.log("login error", error)
          setLoading(false)
      }
    }

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
          const response = await usersApi.userImage(username,formData)
          if(response.status === 200){
            toast.success(response.data.notice)
          }
          console.log('image post',response)
          setSelectedUser(response.data.user)
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

    const loadData = () => {
      fetchUserDetails();
    }

    useEffect(()=>{
        loadData();

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
    },[username])



    if (loading) {
      return (
        <div className="h-screen">
          <PageLoader />
        </div>
      );
    }

    const showBlog = (slug) => {
      history.push(`/blog/${slug}/show`)
    }

    const updateBlog = (slug) => {
      history.push(`/blog/${slug}/update`)
    }

    const showStats = (id, comments_count,bookmarks_count,likeable_count, views_count) => {
      history.push({
          pathname: `/stats`,          
          state: {id:id,
                  likeable_count: likeable_count,
                  comments_count: comments_count,
                  bookmarks_count: bookmarks_count,
                  views_count: views_count
                  // setReceivedFollows:setReceivedFollows,                
                }
        })
    }

    const destroyBlog = async(slug) => {
        try {
            const response = await axios.delete(`/blogs/${slug}`);
            if(response){
                response.success = response.status === 200;
                if (response.data.notice){
                    toast.success(response.data.notice)                  
                }
            }
            await fetchUserDetails();
        }catch(error){
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
            console.log(error)
        }
    }


    const showFollowers = () =>{
      history.push(`/user/${username}/followers`)
      // history.push({
      //   pathname: `/users/${username}/followers`,          
      //   state: { user:user,
      //           selectedUser:selectedUser ,
      //           receivedFollows:receivedFollows,
      //           // setReceivedFollows:setReceivedFollows,                
      //         }
      // })
    }

    const showFollowing = () =>{
      history.push(`/user/${username}/following`)
    }

    return (
      <div>
        <div className="max-w-6xl flex items-center overflow-hidden h-auto flex-wrap mx-auto my-4 lg:my-4">
          <div className="w-full rounded-lg shadow-2xl bg-white lg:mx-0">
            <div className="p-4 md:p-14 text-center">
              <div>
                <div className="relative">
                  {uploadLoading ? (
                    <div>
                      <Loader />
                    </div>
                  ):(
                    <div>
                      {!selectedUser.profile_image && (
                        <FaUser className="block rounded-full shadow-xl mx-auto h-48 w-48 text-gray-500 bg-cover bg-center" />
                      )}
                      {selectedUser.profile_image && (
                        <img className="block rounded-full shadow-xl mx-auto h-48 w-48 bg-cover bg-center"
                        src={selectedUser.profile_image} />
                      )} 
                    </div>
                  )}

                  {(user.username === username) ? (
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

                
              </div>             
                     

              <div>
                <h1 className="text-3xl font-bold pt-8 lg:pt-5 text-center">{selectedUser.username}</h1> 
                <div className="flex flex-row justify-center text-center">
                  <h2 >Email: </h2>
                  <span>{selectedUser.email}</span>
                </div>

              </div>


            <div>              
              <div>
                <UserBio
                  username={username} 
                  user = {user}
                  selectedUser={selectedUser}
                  getBio={getBio}
                  setGetBio={setGetBio}
                />
              </div>

              <div className="flex items-center justify-center py-1 overflow-hidden mt-5">
                {(()=>{
                    if((getBio && selectedUser.bio !== "null")){
                        return <div className="w-96">{getBio}</div>
                    }else if(selectedUser?.bio !== "null"){
                        return <div className="w-96">{selectedUser.bio}</div>
                    } else if(getBio){
                        return <div className="w-96">{getBio}</div>
                    }else {
                        return <div></div>
                    }
                })()} 
              </div>
            </div>


              <div>
                <Follow
                  user={user}
                  username={username}
                  selectedUser={selectedUser} 
                  receivedFollows={receivedFollows}
                  setReceivedFollows={setReceivedFollows}                 
                />                
              </div>

              <div className="mt-3 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-center cursor-pointer">
                <div onClick={showFollowers} className="flex flex-col pr-5">
                  <div>Followers</div>
                  <h2>{receivedFollows?.length}</h2>                  
                </div>
                <div onClick={showFollowing} className="flex flex-col">
                  <div>Following</div>
                  <h2>{givenFollows?.length}</h2>
                </div>                
              </div>

              <div>
                <button onClick={showAllUsers}>
                  All users
                </button>
              </div>              


              <div className="mt-3 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-center">
                <UsersSocialLinks />
              </div>

              {(user.username === username) ? (
                <div className="flex items-center justify-center my-5 overflow-hidden">
                  <Link to="/blog/create">
                    <button className="inline-flex justify-center px-4 py-2 text-sm font-medium
                            text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500" 
                    >
                    Write a blog
                    </button>
                  </Link>
                </div>
              ):(
                null
              )}              

              <div>
                <Tabs 
                  bookmarkedBlogs={bookmarkedBlogs}
                  draftBlogs={draftBlogs}
                  publishedBlogs={publishedBlogs}
                  user={user}
                  username = {username}
                  showBlog={showBlog}
                  updateBlog={updateBlog}
                  destroyBlog={destroyBlog}
                  showStats={showStats}
                />
              </div>


              
            </div>
          </div>
        </div>
      </div> 
     
    )
}

export default ProfilePage
