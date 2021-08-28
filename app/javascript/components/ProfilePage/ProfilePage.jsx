import React, { useState } from 'react'
import toast from 'react-hot-toast'
import usersApi from '../apis/users'
import { AuthContext } from '../App'

const ProfilePage = ({
    user, handleLogout, handleBlogSelect
}) => {
    const UserDetails = React.useContext(AuthContext)

    const [selectedUser, setSelectedUser] = useState({})
    const [userblogs, setUserblogs] = useState([])
    const [userComments, setUserComments] = useState([])
    const [profileImage, setProfileImage] = useState()
    const [loading, setLoading] = useState(false)
    const isMyProfile = user.id === selectedUser.id

    const handleSelectedUser = user => {
        setSelectedUser(user)
    }

    const profileStatus = () => {
        if (selectedUser.admin_level === 1) {
            return <div className="bold ">Forums Moderator</div>;
        }
        if (selectedUser.admin_level === 2) {
            return <div className="bold ">Moderator</div>;
        }
        if (selectedUser.admin_level === 3) {
            return <div className="bold ">Site Owner</div>;
        }
        return null;
    }

    const populateLast3Comments = () => userComments.map((comment,index)=>{
        const blog = {id: comment.blog_id}
        if (index>3) return null
        return(
            <button type="button" key={comment.id} onClick={() => handleBlogSelect(blog)}>
                <h4 className="text-camel">{`${comment.blog_title} by ${comment.blog_author}`}</h4>
                <span className="size-16">{`"${comment.content}"`}</span>
            </button>
        )
    })

    // Ensures that the profile image uploaded doesn't go too far over 1 megabyte
    const handleCheckFileSize = e => {
        const elem = e.target;
        if (elem.files[0].size > 1048576) {
        elem.value = '';
        } else { setProfileImage(elem.files[0]); }
    };

    const handleProfileImageSubmit = async(e) => {
        e.preventDefault()
        const formData = new FormDate()
        formDate.append('user[profile_image]',profileImage)

        try{
          setLoading(true)
          const response = await usersApi.userImage(selectedUser.id,formData)
          if(response.status === 200){
            toast.success(response.data.notice)
          }
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

    const fetchUserDetails = () =>{
        const userID = UserDetails.id
        setLoading(true)

        usersApi.fetchUser(userID)
        .then(response => {
            if (response.status === 200){
                setSelectedUser(response.data.user)
                setLoading(false)
            }
        })
        .catch(error=>{
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
        })
    }

    const loadData = async()=>{
        await fetchUserDetails();
    }

    useEffect(()=>{
        loadData();

        if (Object.keys(selectedUser).length > 0) {
            const allUserblogs = selectedUser.blogs;
            const latestblogs = allUserblogs.length > 0 ? allUserblogs.sort((a, b) => b.id - a.id) : [];
            const allUserComments = selectedUser.comments;
            const latestComments = allUserComments.length > 0
              ? allUserComments.sort((a, b) => b.id - a.id) : [];
            const isAdmin = user.admin_level > 0;
            if (isAdmin) {
              setUserBlogs(latestblogs);
              setUserComments(latestComments);
            }
            if (!isAdmin) {
              setUserBlogs(latestblogs.filter(blog => !blog.admin_only_view));
              setUserComments(latestComments.filter(comment => !comment.admin_only_view));
            }
        }
    },[user, selectedUser])

    const renderUploaderForm = (
        <div className="modal">
          <button type="button" className="modal-bg" onClick={() => setRenderUploader(!renderUploader)}>x</button>
          <div className="modal-content">
            <div className="container-md">
              <form className="modal-form" onSubmit={handleProfileImageSubmit} encType="multipart/form-data">
                <h3 className="text-center">Upload Profile Image</h3>
                <input
                  type="file"
                  id="profileImage"
                  name="profile_image"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleCheckFileSize}
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      );

    return (
        <div id="UserProfile" className="bg-main">
      <div className="container-md">
        {(isMyProfile && renderUploader) && renderUploaderForm}
        <div className="section text-center">
          {isMyProfile && (
            <div>
              <h2>My Profile Page</h2>
              <h3>
                <button type="button" className="login-btn" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt" />
                  Sign out
                </button>
              </h3>
            </div>
          )}
          {!isMyProfile && <h2 className="text-camel">{`${selectedUser.username}'s Profile Page`}</h2>}
          {!selectedUser.profile_image && (
            <i className="fas fa-user profile-pic" />
          )}
          {selectedUser.profile_image && (
            <img className="profile-pic" alt="user's profile" src={`${selectedUser.profile_image}`} />
          )}
          {isMyProfile && (
            <div>
              <button
                type="button"
                className="image-btn"
                onClick={() => setRenderUploader(!renderUploader)}
              >
                Change profile image
              </button>
            </div>
          )}
          {' '}
          {profileStatus()}
          {!selectedUser.is_activated && (
            <div className="text-suspended">Account not activated</div>
          )}
          {!selectedUser.can_comment && (
            <div className="text-suspended">User&apos;s ability to comment on posts has been suspended</div>
          )}
          {!selectedUser.can_post && (
            <div className="text-suspended">User&apos;s ability to create new posts has been suspended</div>
          )}
        </div>
        <div className="section">
          <h2>Recent Activity</h2>
          <div className="ml-1">
            <h3>Latest Posts</h3>
            <div id="BlogPage" className="latest-posts mb-1">
              <Paginate
                posts={userPosts}
                handlePostSelect={handlePostSelect}
                populatePosts={populatePosts}
                postsPages={5}
              />
            </div>
          </div>
          <div className="ml-1">
            <h3>Latest Comments</h3>
            <div className="latest-comments">
              {populateLast3Comments()}
            </div>
          </div>
        </div>
        {isMyProfile && (
          <AdminPanel
            user={user}
            handleLoader={handleLoader}
            handleMainModal={handleModal}
          />
        )}
        {!isMyProfile && (
          <AdminPanel
            user={user}
            selectedUser={selectedUser}
            handleSelectedUser={handleSelectedUser}
            handleLoader={handleLoader}
            handleMainModal={handleModal}
          />
        )}
      </div>
    </div>
    )
}

export default ProfilePage
