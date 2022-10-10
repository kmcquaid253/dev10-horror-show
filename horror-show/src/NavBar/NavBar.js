import {Link, useHistory} from 'react-router-dom';
import {useContext} from 'react';
import AuthContext from '../AuthContext';

function NavBar(props) {

    const loginInfo = useContext(AuthContext);
    const history = useHistory();

    function logoutHandler() {
        prrops.setLoginInfo(null);
        history.push("/");
    }

    return (
        
    )
}