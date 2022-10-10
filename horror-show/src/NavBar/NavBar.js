import {useContext} from "react";
import { Link } from "react-router-dom";

import AuthContext from "../AuthContext/AuthContext";

function NavBar() {
// grab value attribute from AuthContext.Provider
  const auth = useContext(AuthContext);

  // if we have an auth.user, render an add link,
  // user's username, and logout button
  // if we don't, render "Login" and "Register" navigation

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {auth.user ? (
        <li>
          <Link to="/add">Add</Link>
        </li>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </>
      )}
      </ul>
      {auth.user && (
        <div>
          Welcome {auth.user.username}!
          <button onClick={() => auth.logout()}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
