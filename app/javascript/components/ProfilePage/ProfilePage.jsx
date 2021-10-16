import React, { useState, useEffect,Fragment } from 'react'
import toast from 'react-hot-toast'
import usersApi from '../apis/users'
import axios from "axios";
import PageLoader from '../PageLoader'
import BlogsDashboard from '../Blogs/BlogsDashboard';
import { FaUser } from 'react-icons/fa'
import {useHistory} from 'react-router-dom'
import ImageUploadModal from './ImageUploadModal';
import {Link} from 'react-router-dom'
import MyBlogs from './MyBlogs';
import BookmarkedView from './BookmarkedView';
import Tabs from './Tabs';

const ProfilePage = ({
    user, handleLogout, handleBlogSelect,
}) => {
    let history = useHistory()
    const [selectedUser, setSelectedUser] = useState({})
    const [publishedBlogs, setPublishedBlogs] = useState([])
    const [draftBlogs, setDraftBlogs] = useState([])
    const [bookmarkedBlogs, setBookmarkedBlogs] = useState([])
    const [profileImage, setProfileImage] = useState()

    const [loading, setLoading] = useState(false)

    const handleSelectedUser = user => {
        setSelectedUser(user)
    }

    const handleCheckFileSize = e => {
        const elem = e.target;
        if (elem.files[0].size > 1048576) {
        elem.value = '';
        } else { setProfileImage(elem.files[0]); }
    };

    const handleProfileImageSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('user[profile_image]',profileImage)
        try{
          setLoading(true)
          const response = await usersApi.userImage(selectedUser.id,formData)
          if(response.status === 200){
            toast.success(response.data.notice)
          }
          console.log('image post',response)
          setSelectedUser(response.data.user)
          setLoading(false)
        }catch(error) {
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

    const fetchUserDetails = async() =>{
      setLoading(true)
      const userID = user.id
      try{
        const response = await usersApi.fetchUser(userID)
        setSelectedUser(response.data.user)
        setPublishedBlogs(response.data.published_blogs)
        setDraftBlogs(response.data.draft_blogs)
        setBookmarkedBlogs(response.data.bookmarked)
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

    const loadData = () => {
      fetchUserDetails();
    }

    useEffect(()=>{
        loadData();

        // if (Object.keys(selectedUser).length > 0) {
        //     const allpublishedBlogs = selectedUser.blogs;
        //     const latestblogs = allpublishedBlogs.length > 0 ? allpublishedBlogs.sort((a, b) => b.id - a.id) : [];
        //     const allUserComments = selectedUser.comments;
        //     const latestComments = allUserComments.length > 0
        //       ? allUserComments.sort((a, b) => b.id - a.id) : [];
        //     const isAdmin = user.admin_level > 0;
        //     if (isAdmin) {
        //       setPublishedBlogs(latestblogs);
        //       setUserComments(latestComments);
        //     }
        //     if (!isAdmin) {
        //       setPublishedBlogs(latestblogs.filter(blog => !blog.admin_only_view));
        //       setUserComments(latestComments.filter(comment => !comment.admin_only_view));
        //     }
        // }
    },[])



    if (loading) {
      return (
        <div className="h-screen">
          <PageLoader />
        </div>
      );
    }

    const showBlog = (slug) => {
      history.push(`/blogs/${slug}/show`)
    }

    const updateBlog = (slug) => {
      history.push(`/blogs/${slug}/edit`)
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

    return (
      <div>
        <div className="max-w-6xl flex items-center h-auto flex-wrap mx-auto my-4 lg:my-4">
          <div className="w-full rounded-lg shadow-2xl bg-white mx-6 lg:mx-0">
            <div className="p-4 md:p-14 text-center">
              <div>
                {!selectedUser.profile_image && (
                  <FaUser className="block rounded-full shadow-xl mx-auto h-48 w-48 bg-cover bg-center" />
                )}
                {selectedUser.profile_image && (
                  <img className="block rounded-full shadow-xl mx-auto h-48 w-48 bg-cover bg-center"
                  src={selectedUser.profile_image} />
                )}          
              </div>
              
              <div>
                <ImageUploadModal 
                  handleImageSubmit={handleProfileImageSubmit}
                  handleCheckFileSize={handleCheckFileSize}
                />        
              </div>        

              <div>
                <h1 className="text-3xl font-bold pt-8 lg:pt-5 text-center">{selectedUser.username}</h1>     
              </div>	

              <div className="mt-3 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-center">
                <a className="link" href="#" data-tippy-content="@facebook_handle"><svg className="h-6 fill-current text-gray-600 hover:text-blue-700 pr-4" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title><path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0"/></svg></a>
                <a className="link" href="#" data-tippy-content="@twitter_handle"><svg className="h-6 fill-current text-gray-600 hover:text-blue-700 pr-4" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/></svg></a>
                <a className="link" href="#" data-tippy-content="@instagram_handle"><svg className="h-6 fill-current text-gray-600 hover:text-blue-700 pr-4" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg></a>
              </div>

              <div className="flex items-center justify-center my-5 overflow-hidden">
                <Link to="/blogs/create">
                  <button className="inline-flex justify-center px-4 py-2 text-sm font-medium
                          text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500" 
                  >
                  Write a blog
                  </button>
                </Link>
              </div>

              <div>
                <Tabs 
                  bookmarkedBlogs={bookmarkedBlogs}
                  draftBlogs={draftBlogs}
                  publishedBlogs={publishedBlogs}
                  user = {user}
                  showBlog={showBlog}
                  updateBlog={updateBlog}
                  destroyBlog={destroyBlog}
                />
              </div>


              {/* <div className="mt-2">
                {bookmarkedBlogs.length === 0 ? (
                  <div></div>
                ) : 
                  (
                  <div className="mt-2 pb-10 w-full mx-auto flex flex-col items-center justify-center">
                    <div>
                      <h1 className="text-3xl font-bold pt-4 lg:pt-5 text-center">Bookmarks</h1>                  
                    </div>
                    <BookmarkedView 
                      data={bookmarkedBlogs}
                      showBlog={showBlog}
                    />
                  </div>
                )}                  
              </div>  */}

              {/* <div className="mt-2">
                {draftBlogs.length === 0 ? (
                  <div></div>
                ) : 
                  (
                  <div className="mt-2 pb-10 w-full mx-auto flex flex-col items-center justify-center">
                    <div>
                      <h1 className="text-3xl font-bold pt-4 lg:pt-5 text-center">Drafts</h1>                  
                    </div>
                    <MyBlogs 
                      data={draftBlogs}
                      user = {user}
                      showBlog={showBlog}
                      updateBlog={updateBlog}
                      destroyBlog={destroyBlog}
                    />
                  </div>
                )}                  
              </div> */}
              

              {/* <div className="mt-2 pb-10 w-full mx-auto flex flex-col items-center justify-center">
                <div>
                  <h1 className="text-3xl font-bold pt-4 lg:pt-5 text-center">My Blogs</h1>                  
                </div>
                
                <div className="mt-2">
                  {publishedBlogs.length === 0 ? (
                    <h1 className="text-3xl font-bold pt-4 lg:pt-5 text-center">
                      You haven't shared your story yet
                    </h1>
                  ) : 
                   (
                    <MyBlogs 
                      data={publishedBlogs}
                      user = {user}
                      showBlog={showBlog}
                      updateBlog={updateBlog}
                      destroyBlog={destroyBlog}
                    />
                  )}                  
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div> 
     
    )
}

export default ProfilePage
