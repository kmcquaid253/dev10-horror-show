import Error from "../Error/Error";
import AuthContext from "../AuthContext/AuthContext";
import React, {useState, useContext} from "react";
import {Link, useHistory} from "react-router-dom";
import './Register.css';

function Register() {

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordConfirm, setPasswordConfirm] = useState(null);


    const [errors, setErrors] = useState([]);

    const auth = useContext(AuthContext);

    const history = useHistory();

    function showErrors( listOfErrorMessages ){
        const messageContainer = document.getElementById("messages");
        
        messageContainer.innerHTML = listOfErrorMessages.map( m => "<p>" + "💀 " + m + " 💀" + "</p>" ).reduce( (prev, curr) => prev + curr );
    }

    const handleSubmit =  async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:8080/create_account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                username,
                password,
                passwordConfirm,
            }),
        })
        .then(async response => {
            if(response.status === 201){
                history.push("/login")
            }else if(response.status === 403){
                return Promise.reject(["Registration failed."]);
            } else if( response.status === 400 ){
                return Promise.reject( await response.json());
            }
        })
        .catch(errorList => {
            if(errorList instanceof TypeError){
                showErrors(["Could not connect to the api."]);
            } else{
                showErrors(errorList);
            }
        });
    }

    return (
        <>
        <div className="register-container">
        <h2 className="h2-login">
            Register
            <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
                    <span className="drop"></span>
        </h2>
        <div className="box">
        {errors.map((error, i) => 
        (
            <Error key={i} msg={error} />
        ))}
        <form id="registerForm" onSubmit={handleSubmit}>

        <div className="inputBox">
            <h6 id="error-messages"><div id="messages" role="alert"></div></h6>
                <label htmlFor="firstName" className="registration-textfont">First Name:</label>
                <input
                    type="text"
                    onChange={(event) => setFirstName(event.target.value)}
                    id="firstName"
                />
        </div>

        <div className="inputBox">
                <label htmlFor="lastName" className="registration-textfont">Last Name:</label>
                <input
                    type="text"
                    onChange={(event) => setLastName(event.target.value)}
                    id="lastName"
                />
            </div>

            <div className="inputBox">
                <label htmlFor="username" className="registration-textfont">Username:</label>
                <input
                    type="text"
                    onChange={(event) => setUsername(event.target.value)}
                    id="username"
                />
            </div>

            <div className="inputBox">
                <label htmlFor="password" className="registration-textfont">Password:</label>
                <input
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    id="password"
                />
            </div>

            <div className="inputBox">
                <label htmlFor="passwordConfirm" className="registration-textfont">Confirm Password:</label>
                <input
                    type="password"
                    onChange={(event) => setPasswordConfirm(event.target.value)}
                    id="confirmPassword"
                />
            </div>

            <div>
                <button className="login-a" type="submit">
                        <span className="span"></span>
                        <span className="span"></span>
                        <span className="span"></span>
                        <span className="span"></span>
                    Register</button>
                <button className="cancel-a">
                    <Link to="/" id="cancelButton" className="cancel-navbar-textdecoration">
                        <span className="span"></span>
                        <span className="span"></span>
                        <span className="span"></span>
                        <span className="span"></span>
                        
                         Cancel
                    </Link>
                </button>
            </div>
        </form>
        </div>
    </div>
    </>

    );
}

export default Register;