import './App.css';
import AuthContext from './AuthContext/AuthContext';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
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
import MovieReviews from './ReviewList/MovieReviews';
import Watched from './Watchlist/Watched';
import Detail from './Watchlist/Detail';
import WatchlistPage from './Watchlist/WatchlistPage';
import WatchLater from './Watchlist/WatchLater';
import { DataProvider } from './Watchlist/DataContext';
import EditReview from './EditReview/EditReview';
import DeleteReview from './DeleteReview/DeleteReview';
import FriendList from './Friend/FriendList';
import FriendMovieList from './Friend/FriendMovieList';
const LOCAL_STORAGE_TOKEN_KEY = "horrorShow";

function App() {

  const [watchLater, setWatchLater] = useState([]);
  const [watched, setWatched] = useState([]);

  const [user, setUser] = useState(null);
  const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);

  

  useEffect(() => {

    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

    const laterList = localStorage.getItem("watchLater");
    const soonerList = localStorage.getItem("watched");

    //const token = null;
    if (!user && token) {

      login(token);
    }

    if (token && (!laterList || !soonerList)) {
      storeWatchlist(token);
    }
    setRestoreLoginAttemptCompleted(true);
  }, []);

  function storeWatchlist(token){
    fetch('http://localhost:8080/api/watchlist', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        if (response.status == 200) {
          return response.json();
        }
        console.log(response);
      })
        .then(watchlistItems => {
          const laterList = watchlistItems.filter((i) => i.watchLater);
          localStorage.setItem("watchLater", laterList);
          setWatchLater(laterList);

          const soonerList = watchlistItems.filter((i) => i.watched);
          localStorage.setItem("watched", soonerList);
          setWatched(soonerList);
        }).catch((e) => console.log(e))
  }

  const login = (token) => {

    const laterList = localStorage.getItem("watchLater");
    const soonerList = localStorage.getItem("watched");

    if (!laterList || !soonerList) {
      storeWatchlist(token);
    }

    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

    const { sub: username, authorities: authoritiesString, jti: userId } = jwtDecode(token);
    const roles = authoritiesString.split(',');
    const user = {
      username,
      roles,
      token,
      userId,
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
    setWatchLater([]);
    setWatched([]);
    localStorage.clear();
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
            <Error />
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
            {!user ? <Login /> : <Redirect to="/" />}
          </Route>


          <Route path="/register">
            <Register />
          </Route>

          <Route path="/friendreview/:appUserId">
            <MovieReviews />
          </Route>

          <Route path="/reviewlist">
            {user ? <MovieReviews />
              : <Redirect to="/" />}
          </Route>

          <Route path="/review">
            {user ? <AddReview />
              : <Redirect to="/" />}
          </Route>

          <Route path="/reviews/edit/:reviewId">
            {user ? <EditReview />
              : <Redirect to="/" />}
          </Route>

          <Route path="/reviews/delete/:reviewId">
            {user ? <DeleteReview />
              : <Redirect to="/" />}
          </Route>

          <Route path="/friends">
            {user ? <FriendList />
              : <Redirect to="/" />}
          </Route>


          {/* <Route path="/movieWatch">
            {user ? <MovieWatchlist/>
              : <Redirect to="/" />}
          </Route> */}

          <DataProvider watched={watched} watchLater={watchLater} setWatched={setWatched} setWatchLater={setWatchLater}>
            {/* <WatchlistNavbar /> */}
            {/* for watchlist */}
            <Route path="/watchlist">
              {user ? <WatchlistPage />
                : <Redirect to="/" />}
            </Route>

            <Route path="/watchlater">
              {user ? <WatchLater />
                : <Redirect to="/" />}
            </Route>

            <Route path="/watched">
              {user ? <Watched />
                : <Redirect to="/" />}
            </Route>

            <Route path="/friendwatched">
              {user ? <FriendMovieList />
                : <Redirect to="/" />}
            </Route>

            <Route path="/details/:str">
              {user ? <Detail />
                : <Redirect to="/" />}
            </Route>
          </DataProvider>

          <Route>
            <NotFound />
          </Route>
        </Switch >
      </Router >
    </AuthContext.Provider >
  );
}
export default App;