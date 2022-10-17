import {useEffect, useState} from 'react';
import { useParams, Link, useHistory } from "react-router-dom";
import "./DeleteReview.css";

function DeleteReview(){

    //'useParams' allows us to pull the id off of the URL
    const {reviewId} = useParams();
    const[review, setReview] = useState(null);
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    useEffect( () => {//useEffect will only make the fetch happen once when the page first load up
        fetch("http://localhost:8080/api/review/" + reviewId)
        .then(
            response => {
                if(response.status === 200){//getting the single review object
                    return response.json(); //produces new 2nd promise
                } else{
                    //TODO: proper error handling
                    setErrors(["Could not find matching review to delete."])
                }
            }
        )
        .then(selectedReview => {//variable comes from the api
            setReview(selectedReview);
        });
    }, [reviewId]); //sending an empty array so it doesnt re-run


    function handleSubmit(event){//take in an event to prevent it from posting
        event.preventDefault();

        //create  request
        fetch("http://localhost:8080/api/review/" + reviewId, {
            method: "DELETE",
            body: JSON.stringify(review),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if(response.status === 204){
                //if successful delete review, bring them to reviewlist
                //redirect the user to the updated list of reviews

                history.push("/reviewlist");
            
            } else{
                setErrors(["Could not find matching review to delete."])
            }
        })
        .catch(() => 
            setErrors(["Could not connect to API."]
        ));
    }

    return(

        
        <div className='container'>
            
            <div id="messages">
                <h3 className='delete-review-h3'>WARNING</h3>
                <h6 className='del-war'>Are you sure you want to delete the following Review?</h6>
                <h6 className='del-war'>CAUTION: Deletion is permanent</h6>
            </div>

            <div className='button-container-div'>
                <form onSubmit={handleSubmit}>
                <button className='btn delete-deleteButton'>Delete</button>
                <button className="btn delete-cancelButton"><Link to="/reviewlist"  id="cancelButton">Cancel</Link></button>
                </form> 
            </div>
        </div>
        
    );

}

    export default DeleteReview;
