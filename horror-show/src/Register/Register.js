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

        const response = await fetch("http://localhost:8080/authenticate", {
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
        if(response.status === 200) {
            const {jwt_token} = await response.json();
            console.log(jwt_token);
            auth.login(jwt_token);
            history.push("/");
        } else if (response.status === 403){
            setErrors(["Registration Failed."]);
        } else {
            setErrors(["Unknown error"]);
        }
    };

    

    return (
        <div className="container">
            <h2>Register</h2>
            {errors.map((error, i) => 
            (
                <Error key={i} msg={error} />
            ))}
            <form onSubmit={handleSubmit}>
                <FormInput
                inputType={"text"}
                identifier={"firstName"}
                labelText={"First Name"}
                onChangeHandler={"inputChangeHandler"}
                />

                <FormInput
                inputType={"text"}
                identifier={"lastName"}
                labelText={"Last Name"}
                onChangeHandler={"inputChangeHandler"}
                />

                <FormInput
                inputType={"text"}
                identifier={"username"}
                labelText={"Username"}
                onChangeHandler={"inputChangeHandler"}
                />

                <FormInput
                inputType={"text"}
                identifier={"password"}
                labelText={"Password"}
                onChangeHandler={"inputChangeHandler"}
                />

                <FormInput
                inputType={"text"}
                identifier={"passwordConfirm"}
                labelText={"Confirm Password"}
                onChangeHandler={"inputChangeHandler"}
                />

                <button className="btn" id="registerButton">Register</button>
                <Link to="/" className="btn" id="cancelButton">Cancel</Link>

            </form>
        </div>
    );

}

export default Register;