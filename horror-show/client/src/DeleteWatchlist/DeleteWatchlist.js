import {useEffect, useState} from 'react';
import { useParams, Link, useHistory } from "react-router-dom";
import DeleteFormInput from '../DeleteFormInput/DeleteFormInput';

function DeleteWatchlist(){

    const {movieId} = useParams();
    const[watchlist, setWatchlist] = useState(null);
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    useEffect( () => {
        fetch("http://localhost:8080/api/watchlist/" + movieId)
        .then(
            response => {
                if(response.status === 200){
                    return response.json(); 
                } else{
                    //TODO: proper error handling
                    setErrors(["Could not find matching movie to delete."])
                }
            }
        )
        .then(selectedWatchlist => {
            setWatchlist(selectedWatchlist);
        });
    }, [movieId]); 


    function handleSubmit(event){
        event.preventDefault();

        fetch("http://localhost:8080/api/watchlist/" + movieId, {
            method: "DELETE",
            body: JSON.stringify(watchlist),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if(response.status === 204){

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
