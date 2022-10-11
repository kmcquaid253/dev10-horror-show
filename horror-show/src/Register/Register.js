import { toHaveErrorMessage } from "@testing-library/jest-dom/dist/matchers";
import FormInput from "../FormInput/FormInput";

function Register() {

    return (
        <div className="container">
            {errors.length > 0 ? <Error error={error}/> : null}
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

                <button className="btn" id="registerButton">Register</button>
                <Link to="/" className="btn" id="cancelButton">Cancel</Link>

            </form>
        </div>
    );

}

export default Register;