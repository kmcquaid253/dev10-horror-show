import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../AuthContext/AuthContext";
import "./NavBar.css";
function NavBar() {
  // grab value attribute from AuthContext.Provider
  const auth = useContext(AuthContext);
  // if we have an auth.user, render an add link,
  // user's username, and logout button
  // if we don't, render "Login" and "Register" navigation
  return (
    <nav className="navbar">
      <div className="container">
        <ul className="navbar-list">
          <li className="navbar-item navbar-link"><Link to="/">Home</Link></li>
          {auth.user ? (
            <li className="navbar-item navbar-link"><Link to="/review">Add</Link></li>

          ) : (

            <>
              <li className="u-pull-right navbar-link"><Link to="/login">Login</Link></li>
              <li className="navbar-item navbar-link"><Link to="/register">Register</Link></li>
            </>
          )}

{auth.user ? (
            <li className="navbar-item navbar-link"><Link to="/reviewlist">Reviews</Link></li>

          ) : ("")}

          {auth.user ? (
            <li className="navbar-item navbar-link"><Link to="/watchlist">Watchlist</Link></li>

          ) : ("")}

          {auth.user ? (
            <li className="navbar-item navbar-link"><Link to="/friends">Friends</Link></li>

          ) : ("")}

        </ul>
        {auth.user && (
          <div className="welcomeMessage">
            Welcome {auth.user.username}! 
            <button className="logoutButton" onClick={() => auth.logout()}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}
export default NavBar;