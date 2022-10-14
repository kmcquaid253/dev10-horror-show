import './App.css';
import AuthContext from './AuthContext/AuthContext';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import jwtDecode from "jwt-decode";
import Home from './Home/Home';
import Login from './Login/Login';
import NotFound from './NotFound/NotFound';
import NavBar from './NavBar/NavBar';
import Error from './Error/Error';
import Register from './Register/Register';
import AddReview from './AddReview/AddReview';
import MovieDisplay from './TMDBMoviePractice/MovieDisplay';
import MovieReview from './MovieReview/MovieReview';
import Friends from './Friend/Friends';
import Watchlist from './Watchlist/Watchlist';

const LOCAL_STORAGE_TOKEN_KEY = "horrorShowToken";

function App() {
  const [user, setUser] = useState(null);
  const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    //const token = null;
    if (token) {
      login(token);
    }
    setRestoreLoginAttemptCompleted(true);
  }, []);
  const login = (token) => { //do something to ensure token is valid
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
        <NavBar />

        <Switch>

        <Route path="/error">
          <Error/>
        </Route>

          <Route path="/login">
            {!user ? <Login /> : <Redirect to="/" />}
          </Route>

          <Route exact path="/">
            <Home />
          </Route>
          {/* 
          <Route>
            {!user ? <Login /> : <Redirect to="/" />}
          </Route> */}

          {/* manually testing if login works via this path */}
          <Route path="/login">
            <Login />
          </Route>

          {/* separate movie display other than home */}
          <Route path="/movieDisplay">
            <MovieDisplay/>
          </Route>

          <Route path="/register">
            <Register/>
          </Route>

          <Route path="/reviewlist">
            <MovieReview/>
          </Route>

          <Route path="/review">
            <AddReview/>
          </Route>

          <Route path="/friends">
            <Friends/>
          </Route>

          <Route path="/watchlist">
            <Watchlist/>
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch >
      </Router >
    </AuthContext.Provider >
  );
}
export default App;