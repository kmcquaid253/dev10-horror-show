import './App.css';
import AuthContext from './Context/AuthContext';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import jwtDecode from "jwt-decode";

const LOCAL_STORAGE_TOKEN_KEY = "horrorShowToken";



function App() {
  const [user, setUser] = useState(null);
  //define a state variable to track if restore login attempt has completed
  const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);


  // define useEffect hook callback function to attempt to restore the user's token
  // from localStorage
  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      login(token);
    }
    setRestoreLoginAttemptCompleted(true);
  }, []);

  const login = (token) => {
    //set token in localStorage
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

    //decode the token
    const { sub: username, authorities: authoritiesString } = jwtDecode(token);

    //split authorities string into an array of roles
    const roles = authoritiesString.split(',');

    const user = {
      username,
      roles,
      token,
      hasRole(role) {
        return this.roles.includes(role);
      }
    }

    // log user for debugging purposes
    console.log(user);

    //update user state
    setUser(user);

    //return use to caller
    return user;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  };

  const auth = {
    user: user ? { ...user } : null,
    login,
    logout
  };

  // if we haven't attempted to restore the login yet,
  // then don't render the App component
  if (!restoreLoginAttemptCompleted) {
    return null;
  }


  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <div><h2>Horror Moviez</h2></div>

      </Router>
    </AuthContext.Provider>

  );
}

export default App;
