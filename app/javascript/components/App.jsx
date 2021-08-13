import React, { useEffect, useState, useReducer } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import NavBar from './NavBar/NavBar'
import Home from './Home/Home'
import Signup from './Auth/Signup'
import Login from './Auth/Login'
import PageLoader from './PageLoader'
import {setAuthHeaders} from './apis/axios'
import axios from 'axios'
import BlogsDashboard from "./Blogs/BlogsDashboard";
import Blogs from "./Blogs/Blogs";
import ShowBlog from "./Blogs/ShowBlog";
import CreateBlog from "./Blogs/CreateBlog";
import EditBlog from "./Blogs/EditBlog";


export const AuthContext = React.createContext();

// const [isLoggedIn, setIsLoggedIn] = useState(false)
// const [user, setUser] = useState(null)
const initialState = {
  isLoggedIn: false,
  user: null
}

const reducer = (state, action) => {
  switch(action.type){
    case 'Login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload
      }
    case 'Signup':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      }
    case 'Logout':
      return {
        ...state,
        isLoggedIn: false,
        user: null
      } 
    default:
      return state
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [loading, setLoading] = useState(true);

  const checkLoginStatus = () => {
    axios.get('/logged_in',{withCredentials: true})
    .then(response => {
      if(response.data.logged_in && state.isLoggedIn === false){
        dispatch({
          type: 'Login',
          payload: response.data.user.username
        }) 
      }
      else if(!response.data.logged_in && state.isLoggedIn === true ){
        dispatch({
          type: 'Logout',
          payload: null
        })
      }
      console.log("logged in ",response.data.logged_in)
    })
    .catch(error=>{
      console.log(error)
    })
  }

  useEffect(() => {
    // registerIntercepts();
    // initializeLogger();
    setAuthHeaders(setLoading);
    checkLoginStatus()
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return ( 
    <AuthContext.Provider 
      value={{state,dispatch}}
    >  
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login"  component={Login} />
            <Route exact path="/signup"  component={Signup} />
            <Route exact path="/blogs" component={Blogs} /> 
            <Route exact path="/blogs/:id/show" component={ShowBlog} />  
            <Route exact path="/blogs/:id/edit" component={EditBlog} />   
            <Route exact path="/blogs/create" component={CreateBlog} />      
          </Switch>
        </div>      
      </Router>
    </AuthContext.Provider>    
  );
};

export default App;