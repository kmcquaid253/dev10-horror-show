import React, {useContext, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../AuthContext/AuthContext";
import './Login.css';

import Error from "../Error/Error";


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const auth = useContext(AuthContext);

    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:8080/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if(response.status === 200) {
            const {jwt_token} = await response.json();
            console.log(jwt_token);
            auth.login(jwt_token);
            history.push("/");
        } else if (response.status === 403) {
            setErrors(["incorrect password/username."]);
        } else {
            setErrors(["Unknown error."]);
        }
    };

    return (
        <>
        <video autoPlay loop muted play inline class="back-video">
            <source src="fire1.mp4" type="video/mp4"/>
        </video>
            <div className="login-container">
                <h2 className="h2-login">
                    Login
                    {/* <span className="drop"></span>
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
                    <span className="drop"></span> */}
                </h2>
            <div className="box">
            {errors.map((error, i) => 
            (
                <Error key={i} msg={error} />
            ))}
            <form onSubmit={handleSubmit}>
                <div className="inputBox">
                
                    <label htmlFor="username" className="username">Username:</label>
                    <input
                        type="text"
                        onChange={(event) => setUsername(event.target.value)}
                        id="username"
                    />
                </div>
                <div className="inputBox">
                    <label htmlFor="password" className="password">Password:</label>
                    <input className="inputBox"
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                        id="password"
                    />
                </div>
                <div>
                    <button type="submit" className="login-a">
                        <span className="span"></span>
                        <span className="span"></span>
                        <span className="span"></span>
                        <span className="span"></span>
                        Login</button>
                </div>
            </form>
        </div>
        </div>
        </>
    );
}

export default Login;