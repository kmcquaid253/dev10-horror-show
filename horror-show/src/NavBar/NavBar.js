import {useContext} from "react";
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
        <li className="navbar-item"><a className="navbar-link" href="#home"><Link to="/">Home</Link></a></li>
        {auth.user ? (
        <li className="navbar-item"><a className="navbar-link" href="#add"><Link to="/add">Add</Link></a></li>
      ) : (
        <>
          <li className="u-pull-right"><a className="navbar-link" href="#login"><Link to="/login">Login</Link></a></li>
          <li className="navbar-item"><a className="navbar-link" href="#register"><Link to="/register">Register</Link></a></li>
        </>
      )}
      </ul>
      {auth.user && (
        <div>
          Welcome {auth.user.username}!
          <button onClick={() => auth.logout()}>Logout</button>
        </div>
      )}
      </div>
    </nav>
  );
}
export default NavBar;