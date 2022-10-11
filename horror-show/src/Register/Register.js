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

        // const init = {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accept": "application/json"
        //     },
        //     body: JSON.stringify(
        //         firstName,
        //         lastName,
        //         userName,
        //         password,
        //         passwordConfirm,
        //     )
        // };
        // fetch("http://localhost:8080/authenticate/", init)
        // .then async response => {
        //     if (response.status === 201) {
        //         history.push("/authenticate");
        //     } else if (response.status === 400) {

        //     }
        // }
        // }

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
        } else if (response.status === 403){
            setErrors(["Login Failed."]);
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
        <form onSubmit={handleSubmit}>
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




        // <div className="container">
        //     <h2>Register</h2>
        //     {errors.map((error, i) => 
        //     (
        //         <Error key={i} msg={error} />
        //     ))}
        //     <form onSubmit={handleSubmit}>
        //         <FormInput
        //         inputType={"text"}
        //         identifier={"firstName"}
        //         labelText={"First Name"}
        //         onChangeHandler={"inputChangeHandler"}
        //         />

        //         <FormInput
        //         inputType={"text"}
        //         identifier={"lastName"}
        //         labelText={"Last Name"}
        //         onChangeHandler={"inputChangeHandler"}
        //         />

        //         <FormInput
        //         inputType={"text"}
        //         identifier={"username"}
        //         labelText={"Username"}
        //         onChangeHandler={"inputChangeHandler"}
        //         />

        //         <FormInput
        //         inputType={"text"}
        //         identifier={"password"}
        //         labelText={"Password"}
        //         onChangeHandler={"inputChangeHandler"}
        //         />

        //         <FormInput
        //         inputType={"text"}
        //         identifier={"passwordConfirm"}
        //         labelText={"Confirm Password"}
        //         onChangeHandler={"inputChangeHandler"}
        //         />

        //         <button className="btn" id="registerButton">Register</button>
        //         <Link to="/" className="btn" id="cancelButton">Cancel</Link>

        //     </form>
        // </div>
    );

}

export default Register;