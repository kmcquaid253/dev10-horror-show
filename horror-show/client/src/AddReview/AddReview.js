import FormInput from "../FormInput/FormInput";
import {Link, useHistory } from "react-router-dom";
import {useState} from 'react';
import './AddReview.css';

function AddReview(){

    const DEFAULT_REVIEW = {
        userReview: "",
        appUserId: "",
        movieId: "",
    };

    const[review, setReview] = useState(DEFAULT_REVIEW);//state that we track about the page, that way when it does update it will refresh the component

    const history = useHistory();

    function showErrors( listOfErrorMessages ){
        const messageContainer = document.getElementById("messages");

        messageContainer.innerHTML = listOfErrorMessages.map( m => "<p>" + m + "</p>" ).reduce( (prev, curr) => prev + curr ); //reduce into one big string
    }

    function handleSubmit(event){//take in an event to prevent it from posting
        event.preventDefault();

        //Use fetch to POST to the service
        fetch("http://localhost:8080/api/review/reviewId",{
            method: "POST",
            body: JSON.stringify(review),
            headers: {
                "Content-Type": "application/json"
            }
        })
        //fetch returns a response
        .then(async response => {
            if(response.status === 201){
                //Invoking this hook returns an object
                //if successful...
                history.push("path goes here");
            }
            return Promise.reject(await response.json());
            
        })
        //when response.json happens...
        //returns hydrated reviews
        .then(addedReview =>  history.push("path goes here"))
        .catch(error => {
            if(error instanceof TypeError){
                showErrors(["Could not connect to the api."]);//put string into an array because it's handeling multiple error messages
            } else{
                showErrors(error);
            }
        });
    }

    function inputChangeHandler(inputChangedEvent){
        const propertyName = inputChangedEvent.target.name;//We are using the property name to update the value
        const newValue = inputChangedEvent.target.value;

        const reviewCopy = {...review};

        reviewCopy[propertyName] = newValue;

        setReview(reviewCopy);
    }


return(
    <div className='container'>
            <h4>Add Review:</h4>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    inputType={"search"} 
                    identifier={"movieId"} 
                    labelText={"Movie Title"}
                    currVal={review.movieId} 
                    onChangeHandler={inputChangeHandler}/>
                <FormInput 
                    inputType={"text"} 
                    identifier={"userReview"} 
                    labelText={"User Review"}
                    currVal={review.userReview} 
                    onChangeHandler={inputChangeHandler}
                    />

                <button type='submit'>Add</button>
                <button><Link to="/" className="btn" id="cancelButton">Cancel</Link></button>

                <div id="messages" className="alert alert-danger" role="alert"></div>
            </form> 
        </div>
);
}

export default AddReview;