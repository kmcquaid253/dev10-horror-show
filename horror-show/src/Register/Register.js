import Error from "../Error/Error";
import FormInput from "../FormInput/FormInput";
import {useState} from "react";
import {Link} from "react-router-dom";

function Register() {

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordConfirm, setPasswordConfirm] = useState(null);


    const [error, setError] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const inputChangeHandler = (e) => {

        const {id , value} = e.target;
        if(id === "firstName") {
            setFirstName(value);
        }
        if(id === "lastName") {
            setLastName(value);
        }
        if(id === "email") {
            setEmail(value);
        }
        if(id === "password") {
            setPassword(value);
        }
        if(id === "passwordConfirm") {
            setPasswordConfirm(value);
        }

    }

    return (
        <div className="container">
            {error.length > 0 ? <Error error={error}/> : null}
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
                identifier={"email"}
                labelText={"Email"}
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