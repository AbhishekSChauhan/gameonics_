import React, { useEffect, useState, useReducer } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import NavBar from './NavBar/NavBar'
import Home from './Home/Home'
import Signup from './Auth/Signup'
import Login from './Auth/Login'
import PageLoader from './PageLoader'
import {setAuthHeaders} from './apis/axios'

export const AuthContext = React.createContext();

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

  useEffect(() => {
    // registerIntercepts();
    // initializeLogger();
    setAuthHeaders(setLoading);
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
          <NavBar  />
          <Switch>
            <Route 
              exact path="/" 
              render={props => (
                <Home {...props} loggedInStatus={state.isLoggedIn} />
              )} 
            />
            <Route exact path="/login"  component={Login} />
            <Route exact path="/signup"  component={Signup} />            
          </Switch>
        </div>      
      </Router>
    </AuthContext.Provider>    
  );
};

export default App;