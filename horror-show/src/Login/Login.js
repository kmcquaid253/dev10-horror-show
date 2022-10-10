
import React, {useContext, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../AuthContext/AuthContext";

import Error from "../Error/Error";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const auth = useContext(AuthContext);

    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        //call api to authenticate and get token

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
        
        //executes if request is successful
        if(response.status === 200) {
            const {jwt_token} = await response.json();
            console.log(jwt_token);
            auth.login(jwt_token);
            history.push("/");
        } else if (response.status === 403) {
            setErrors(["Login failed."]);
        } else {
            setErrors(["Unknown error."]);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {errors.map((error, i) => 
            (
                <Error key={i} msg={error} />
            ))}
            <form onSubmit={handleSubmit}>
                <div>
                    {/* Includes for/id attributes for basic HTML accessibility ♿. */}
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        onChange={(event) => setUsername(event.target.value)}
                        id="username"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                        id="password"
                    />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}