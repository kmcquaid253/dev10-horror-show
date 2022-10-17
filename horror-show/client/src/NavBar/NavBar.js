import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../AuthContext/AuthContext";
import "./NavBar.css";
function NavBar() {

  const auth = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="container">
        <ul className="navbar-list">
          <li className="navbar-item navbar-link"><Link to="/">Home</Link></li>
          {auth.user ? (
            <li className="navbar-item navbar-link"><Link to="/review">Add Review</Link></li>

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