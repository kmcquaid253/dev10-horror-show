import {useEffect, useState} from 'react';
import { useParams, Link, useHistory } from "react-router-dom";
import DeleteFormInput from '../DeleteFormInput/DeleteFormInput';

function DeleteWatchlist(){

    //'useParams' allows us to pull the id off of the URL
    const {movieId} = useParams();
    const[watchlist, setWatchlist] = useState(null);
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    useEffect( () => {//useEffect will only make the fetch happen once when the page first load up
        fetch("http://localhost:8080/api/watchlist/" + movieId)
        .then(
            response => {
                if(response.status === 200){//getting the single movie object
                    return response.json(); //produces new 2nd promise
                } else{
                    //TODO: proper error handling
                    setErrors(["Could not find matching movie to delete."])
                }
            }
        )
        .then(selectedWatchlist => {//variable comes from the api
            setWatchlist(selectedWatchlist);
        });
    }, [movieId]); //sending an empty array so it doesnt re-run


    function handleSubmit(event){//take in an event to prevent it from posting
        event.preventDefault();

        //create  request
        fetch("http://localhost:8080/api/watchlist/" + movieId, {
            method: "DELETE",
            body: JSON.stringify(watchlist),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if(response.status === 204){
                //if successful delete movie from watchlist, bring them to home TEMPORARILY

                //temporarily setting it to home until we create a watchlist path
                //Same goes to cancel button
                history.push("/home");
            
            } else{
                setErrors(["Could not find matching movie on watchlist to delete."])
            }
        })
        .catch(() => 
            setErrors(["Could not connect to API."]
        ));
    }

    return(

        <>
        <div className='container'>
            
            <div id="messages">
                <h3>WARNING</h3>
                <h6 id='del-war'>Are you sure you want to delete the following movie from your watchlist?</h6>
                <h6 id='del-war'>CAUTION: Deletion is permanent</h6>
            </div>

            {watchlist ?
                <form onSubmit={handleSubmit}>

                <button className='btn btn-danger del-btn'>Delete</button>
                <Link to="/home" className="btn btn-warning can-btn">Cancel</Link>
                </form> :
            null}
        </div>
        </>
    );

}

    export default DeleteWatchlist;
