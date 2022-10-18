import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../AuthContext/AuthContext";
import "./NavBar.css";
function NavBar() {

  const auth = useContext(AuthContext);

  return (
    <nav className="navbar nav">
      <div className="container">
        <ul className="navbar-list">
          <li className="navbar-item navbar-link"><Link to="/" className="navbar-textdecoration">Home</Link></li>
          {auth.user ? (
            <li className="navbar-item navbar-link"><Link to="/review" className="navbar-textdecoration">Add Review</Link></li>
          ) : (
           <>
              <li className="u-pull-right navbar-link"><Link to="/login">Login</Link></li>
              <li className="navbar-item navbar-link"><Link to="/register">Register</Link></li>
            </>
          )}
          
        {auth.user ? (
              <li className="navbar-item navbar-link"><Link to="/reviewlist" className="navbar-textdecoration">Reviews</Link></li>
          ) : ("")}

          {auth.user ? (
            <ul className="watch-ul">
              <li className="navbar-item navbar-link"><a href="#" className="navbar-textdecoration">WatchList</a></li>
                <ul className="watched-ul">
                  <li className="droplist"><Link className ="a" to="/watchlist">Search</Link></li>
                  <li className="droplist"><Link className ="a" to="/watchlater">Watch Later</Link></li>
                  <li className="droplist"><Link className ="a" to="/watched">Watched</Link></li>
                </ul>  
            </ul>
          ) : ("")}

          {auth.user ? (
            <li className="navbar-item navbar-link"><Link to="/friends" className="navbar-textdecoration">Friends</Link></li>

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