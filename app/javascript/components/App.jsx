import React, { useEffect, useState, useReducer } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import NavBar from './NavBar/NavBar'
import Home from './Home/Home'
import Signup from './Auth/Signup'
import Login from './Auth/Login'
import PageLoader from './PageLoader'
import {setAuthHeaders} from './apis/axios'
import Blogs from "./Blogs/Blogs";
import ShowBlog from "./Blogs/ShowBlog";
import CreateBlog from "./Blogs/CreateBlog";
import EditBlog from "./Blogs/EditBlog";
import { Comments } from "./Comments/Comments";
import Footer from "./Footer/Footer";
import toast, { Toaster } from "react-hot-toast";
import ScrollToTop from "./ScrollToTop";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import ProfilePage from "./ProfilePage/ProfilePage";
import authApi from "./apis/auth";
import GameDetails from "./Games/GameDetails";
import { Redirect } from "react-router-dom";
import axios from "axios";

import PreviewBlog from "./Blogs/PreviewBlog";
import TaggedBlogs from "./Tags/TaggedBlogs";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from './Unauthorized'
import Followers from "./Follow/Followers";
import Following from "./Follow/Following";
import ActivationPage from "./Auth/ActivationPage";
import HelmetMetaData from "./Share/HelmetMetaData";
import Subscribe from "./Subscribe.jsx/Subscribe";
import BlogStats from "./Stats/Stats";
import EditProfile from "./ProfilePage/EditProfile";
import Games from "./Games/Games";


const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({logged_in: false})
  const [selectedBlog, setSelectedBlog] = useState(null)

  const url = 'https://morning-anchorage-15866.herokuapp.com'


  useEffect(() => {
    checkLoginStatus();
    setAuthHeaders(setLoading);
  }, []);

  const handleBlogSelect = (blog) => {
    setSelectedBlog(blog)
  }

  const handleLogin = (user) => {
    setUser(user)
  }

  const handleLogout = async() => {
    try{
      setLoading(true)
      const response = await authApi.logout()
      if(response.status === 200){
        toast.success(response.data.notice)
        setUser({logged_in:false})
        setLoading(false)
        // {<Redirect to="/" />}
      }
      
    }catch(error) {
      // console.log("signup error",error)
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

  const checkLoginStatus = async() => {
    setLoading(true)    
    try{
      const response = await authApi.loggedIn()
      // const response = await axios.get("/logged_in",{ withCredentials: true })
      setUser(response.data.user)
      // console.log('logged in status', response)
      setLoading(false)
    }catch(error) {
      setLoading(false)
      // console.log('check login error',error)
    } 
  }
  

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return ( 
      <Router>
        {/* <React.StrictMode> */}
          <HelmetMetaData />
          <Toaster position="top-right" reverseOrder={false}/>          
          <NavBar handleLogout={handleLogout} user={user} setUser={setUser} />
          <ScrollToTop />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route 
              exact 
              path="/login" 
              render={()=>(
                <Login handleLogin={handleLogin}/>
              )}
            />
            <Route exact path="/signup"  component={Signup} />
            <Route exact path="/forgot_password" component={ForgotPassword} />
            <Route exact path="/reset_password" component={ResetPassword} />

            <Route exact path="/subscribe" component={Subscribe} />

            <Route exact path="/blog" 
              render={(props)=>(
                <Blogs 
                  user = {user} 
                />
              )}
            /> 
            <Route exact path="/blog/:slug/show" 
              render={(props)=>(
                <ShowBlog 
                  user = {user} 
                />
              )}
            /> 
            <Route exact path="/blog/:slug/preview" component={PreviewBlog} /> 
            <Route exact path="/blog/:slug/update" component={EditBlog} />   
            <Route exact path="/blog/create" component={CreateBlog}/>
            <Route exact path="/blog/:id/comments" component={Comments} />          
            <Route exact path="/user/:username" 
              render={(props)=>(
                <ProfilePage 
                  user = {user} 
                  handleLogout={handleLogout} 
                  handleBlogSelect={handleBlogSelect}
                />
              )} 
            />

            <Route exact path="/user/:username/edit" 
              render={(props)=>(
                <EditProfile 
                  user = {user} 
                />
              )} 
            />
            
            <Route exact path="/user/:username/followers" 
              render={(props)=>(
                <Followers 
                  user = {user} 
                />
              )} 
            />

            <Route exact path="/user/:username/following" 
              render={(props)=>(
                <Following 
                  user = {user} 
                />
              )} 
            />
            
            <Route exact path="/games" component = {Games} />
            <Route exact path="/games/:slug" component = {GameDetails} />

            {/* <Route path="/games" 
              render={(props)=>(
                <Games 
                />
              )}
            />

            <Route path="/games/:slug" 
              render={(props)=>(
                <GameDetails 
                />
              )}
            /> */}

            <Route exact path="/:slug/stats" 
              render={(props)=>(
                <BlogStats 
                  user={user} 
                />
              )}
            />

            <Route exact path="/stats" component = {BlogStats} />
            <Route exact path="/tags/:tag" component={TaggedBlogs} />

            <ProtectedRoute              
              path="/admin"
              redirectRoute="/login"
              user={user}
              component={Home}
            />
            <Route exact path='/unauthorized' component={Unauthorized} />
              
            <Route exact path="/activate_account" 
              render={(props)=>(
                <ActivationPage 
                  user = {user} 
                />
              )} 
            />

          </Switch>
          {/* <Footer /> */}
        {/* </React.StrictMode>       */}
      </Router>
 
  );
};

export default App;