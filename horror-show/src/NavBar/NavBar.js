import {Link, useHistory} from 'react-router-dom';
import {useContext} from 'react';
import AuthContext from '../AuthContext/AuthContext';

function NavBar(props) {

    const loginInfo = useContext(AuthContext);
    const history = useHistory();

    function logoutHandler() {
        props.setLoginInfo(null);
        history.push("/");
    }

    return (
        <nav className="navbar">
            <div className="navbar" type="button">
                <ul className="">
                    {loginInfo ?
                    <li className="">
                        <Link className="" to="">Movie Lists</Link>
                    </li>
                    : null 
                    }
                </ul>
                {loginInfo ? <button onClock={logoutHandler} className="btn">Logout {loginInfo.claims.sub}</button> :
                <Link className="" to="/login">Login</Link>}
            </div>
        </nav>

    )
}

export default NavBar;