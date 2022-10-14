import {useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import FormInput from "../FormInput/FormInput";

function EditReview() {

    const{reviewId} = useParams();

    const [review, setReview] = useState(null);

    const [errors, setErrors] = useState([]);

    const history = useHistory();

    useEffect(() => {
        fetch("http://localhost:8080/api/review/" + reviewId)
        .then(
            async response => {
                if(response.status === 200) {
                    return response.json();
                } else if (response.status === 409) {
                    return Promise.reject(["ID mismatch between url and sent review"]);
                } else if (response.status === 404) {
                    return Promise.reject(["Review is not found"]);
                } else if (response.status === 400) {
                    return Promise.reject(await response.json());
                }
            })
            .catch(errorList => {
                console.log(errorList);
                if(errorList instanceof TypeError) {
                    setErrors(["Could not connect to the api."]);
                } else {
                    setErrors(errorList);
                }
            })
            .then(selectedReview => {
                setReview(selectedReview);
            });
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        fetch("http://localhost:8080/api/review/" + reviewId, {
            method: "PUT",
            body: JSON.stringify(review),
            headers: {
                "Content-Type": "application/json"
            }
        }) .then(async response => {
            if(response.status === 204) {
                history.push("/reviewlist");
            } else if(response.status === 400) {
                return Promise.reject(await response.json());
            }
        })
        .catch(errorList => {
            console.log(errorList);
            if(errorList instanceof TypeError) {
                setErrors(["Could not connect to the api."]);
            } else {
                setErrors(errorList);
            }
        });
    }

    function inputChangeHandler (inputChangedEvent) {

        const propertyName = inputChangedEvent.target.name;
        const newValue = inputChangedEvent.target.value;

        const reviewCopy = {...review};

        reviewCopy [propertyName] = newValue;

        setReview(reviewCopy);
    }

    return (
        <div className="container">
            {errors.length > 0 ? <Errors errors={errors}/> : null}
            {review ?
            <form onSubmit={handleSubmit}>
                <FormInput

                inputType={"text"}
                identifier={"userReview"}
                labelText={"User Review"}
                currVal={review.userReview}
                onChangeHandler={inputChangeHandler}/>

                <button className="btn" id="editButton">Edit</button>
                <Link to="/reviewlist" className="btn" id="cancelEditButton">Cancel</Link>
            </form> : null}
        </div>
    )

}

export default EditReview;