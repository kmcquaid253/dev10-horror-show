import './App.css';
import AuthContext from './AuthContext/AuthContext';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import jwtDecode from "jwt-decode";
import Home from './Home/Home';
import Login from './Login/Login';
import NavBar from './NavBar/NavBar';

const LOCAL_STORAGE_TOKEN_KEY = "horrorShowToken";



function App() {
  const [user, setUser] = useState(null);

  const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      login(token);
    }
    setRestoreLoginAttemptCompleted(true);
  }, []);

  const login = (token) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

    const { sub: username, authorities: authoritiesString } = jwtDecode(token);

    const roles = authoritiesString.split(',');

    const user = {
      username,
      roles,
      token,
      hasRole(role) {
        return this.roles.includes(role);
      }
    }

    console.log(user);

    setUser(user);

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

  if (!restoreLoginAttemptCompleted) {
    return null;
  }


  return (
    <AuthContext.Provider value={auth}>
      <Router>
        {/* <NavBar/> */}
        <Switch>
          <Route path="/login">
<<<<<<< HEAD
=======
<<<<<<< HEAD
            {!user ? <Login/> : <Redirect to="/" />}
            </Route>
            <Route exact path="/">
              <Home/>
            </Route>
=======
>>>>>>> 11736428af7dcf6cbd093c14f1605be513df6436
            {!user ? <Login /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/">
            <Home />
          </Route>

          {/* manually testing if login works via this path */}
          <Route path="/login">
            <Login />
          </Route>

<<<<<<< HEAD
=======
>>>>>>> dc71961b4d4626ce9d36e55f098f330b3db9c805
>>>>>>> 11736428af7dcf6cbd093c14f1605be513df6436
        </Switch>
      </Router>
    </AuthContext.Provider>

  );
}

export default App;
