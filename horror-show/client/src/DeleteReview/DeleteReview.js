import {useEffect, useState} from 'react';
import { useParams, Link, useHistory } from "react-router-dom";
import "./DeleteReview.css";

function DeleteReview(){

    const {reviewId} = useParams();
    const[review, setReview] = useState(null);
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    useEffect( () => {
        fetch("http://localhost:8080/api/review/" + reviewId)
        .then(
            response => {
                if(response.status === 200){
                    return response.json(); 
                } else{
                    setErrors(["Could not find matching review to delete."])
                }
            }
        )
        .then(selectedReview => {
            setReview(selectedReview);
        });
    }, []); 


    function handleSubmit(event){
        event.preventDefault();


        fetch("http://localhost:8080/api/review/" + reviewId, {
            method: "DELETE",
            body: JSON.stringify(review),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if(response.status === 204){


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
                
                <button className='deleteReview-cancel'><Link to="/"  id="cancelButton">Cancel</Link></button>
                </form> 
            </div>
        </div>
        
    );

}

    export default DeleteReview;
