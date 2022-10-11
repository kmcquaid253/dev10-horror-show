import Error from "../Error/Error";
import AuthContext from "../AuthContext/AuthContext";
import FormInput from "../FormInput/FormInput";
import React, {useState, useContext} from "react";
import {Link, useHistory} from "react-router-dom";

function Register() {

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordConfirm, setPasswordConfirm] = useState(null);


    const [errors, setErrors] = useState([]);

    const auth = useContext(AuthContext);

    const history = useHistory();

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
        });
        if(response.status === 201) {
            history.push("/login");
        } else if (response.status === 403){
            setErrors(["Registration Failed."]);
        } else {
            setErrors(["Unknown error"]);
        }
    };

    

    return (
        <div>
        <h2>Login</h2>
        {errors.map((error, i) => 
        (
            <Error key={i} msg={error} />
        ))}
        <form id="registerForm" onSubmit={handleSubmit}>
        <div>
            
            <label htmlFor="firstName">First Name</label>
            <input
                type="text"
                onChange={(event) => setFirstName(event.target.value)}
                id="firstName"
            />
        </div>
        <div>
            
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    onChange={(event) => setLastName(event.target.value)}
                    id="lastName"
                />
            </div>
            <div>
            
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
            
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input
                    type="text"
                    onChange={(event) => setPasswordConfirm(event.target.value)}
                    id="confirmPassword"
                />
            </div>
            <div>
                <button type="submit">Register</button>
                <button><Link to="/" className="btn" id="cancelButton">Cancel</Link></button>
            </div>
        </form>
    </div>

    );
}

export default Register;