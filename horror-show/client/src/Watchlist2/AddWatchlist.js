import FormInput from "../FormInput/FormInput";
import Error from "../Error/Error";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from 'react';
import './AddReview.css';
import AddReviewTile from "./AddReviewTile";
import AuthContext from "../AuthContext/AuthContext";

const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&query";


function AddWatchlist() {

    const DEFAULT_Watchlist = {
        userReview: "",
        appUserId: "",
        movieId: ""
    };

    const [watchlist, setWatchlist] = useState(DEFAULT_REVIEW);//state that we track about the page, that way when it does update it will refresh the component
    const [movies, setMovies] = useState([]);
    const [id, setId] = useState([]);
    const [query, setQuery] = useState('');
    const auth = useContext(AuthContext);
    const [errors, setErrors] = useState([]);

    const history = useHistory();


    function showErrors(listOfErrorMessages) {
        const messageContainer = document.getElementById("messages");

        messageContainer.innerHTML = listOfErrorMessages.map(m => "<p>" + "💀 " + m + " 💀" + "</p>").reduce((prev, curr) => prev + curr);
    }


    function handleMovieSelect(movieId) {
        const watchlistCopy = { ...watchlist };
        watchlistCopy.movieId = movieId;
        setWatchlist(watchlistCopy);
    }
    //can change styling based on if it matches on selected

    function addWatchlistWatched() {

        //Use fetch to POST watched to the service
        fetch("http://localhost:8080/api/watchlist/watched", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${auth.user.token}`,
            },
            body: JSON.stringify(watchlist),
        })
            //fetch returns a response
            .then(async response => {
                if (response.status === 201) {

                    //Invoking this hook returns an object
                    //if successful...
                    history.push("/watchlist");
                    return response.json();
                }
                return Promise.reject(await response.json());

            })
            .catch(error => {
                if (error instanceof TypeError) {
                    showErrors(["Could not connect to the api."]);//put string into an array because it's handeling multiple error messages
                } else {
                    showErrors(error);
                }
            });
    }

    function addWatchlistWatchLater() {

        //Use fetch to POST watched to the service
        fetch("http://localhost:8080/api/watchlist/watchLater", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${auth.user.token}`,
            },
            body: JSON.stringify(watchlist),
        })
            //fetch returns a response
            .then(async response => {
                if (response.status === 201) {

                    //Invoking this hook returns an object
                    //if successful...
                    history.push("/watchlist");
                    return response.json();
                }
                return Promise.reject(await response.json());

            })
            .catch(error => {
                if (error instanceof TypeError) {
                    showErrors(["Could not connect to the api."]);//put string into an array because it's handeling multiple error messages
                } else {
                    showErrors(error);
                }
            });
    }

    function addMovieAndWatchlist() {
        const movie = movies.find((m) => m.id === watchlist.movieId);

        fetch("http://localhost:8080/api/movie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${auth.user.token}`,
            },
            body: JSON.stringify(movie),
        }).then(response => {
            if (response.status === 201) {
                addWatchlistWatched();
            }
        }).catch(error => {

            showErrors(error);

        });
    }


    function handleSubmit(event) {//take in an event to prevent it from posting
        event.preventDefault();

        addMovieAndReview();
    };


    function inputChangeHandler(inputChangedEvent) {
        const propertyName = inputChangedEvent.target.name;//We are using the property name to update the value
        const newValue = inputChangedEvent.target.value;

        const watchListCopy = { ...watchlist };

        watchListCopy[propertyName] = newValue;

        setWatchlist(watchListCopy);
    }


    const searchMovie = async (e) => {
        e.preventDefault();
        console.log("Searching");
        try {
            //const url = `https://api.themoviedb.org/3/discover/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&query=${query}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27&with_watch_monetization_types=flatrate`; 
            const url = `https://api.themoviedb.org/3/search/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&query=${query}`;
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            setMovies(data.results);
        }
        catch (e) {
            console.log(e);
        }
    }


    const changeHandler = (e) => {
        setQuery(e.target.value);
    }


    return (
        <div className='container'>
            <h2>Add Watchlist:</h2>
            <h6 className="add-watchlist-error-messages"><div id="messages" role="alert"></div></h6>
            <div className="searchDiv">
                <form onSubmit={searchMovie}>
                    <FormInput className="d-flex" onSubmit={searchMovie} autoComplete="off"

                        inputType={"search"}
                        identifier={"movieWatchlist"}
                        labelText={"Movie Title Search"}
                        currVal={query}
                        onChangeHandler={changeHandler}

                    />

                    <button variant="secondary" className="searchButton" type="submit">Search</button>

                    <div className="grid">
                        {movies.map((movie) =>
                            <AddWatchlistTile key={movie.id} {...movie} onMovieClick={handleMovieSelect} matchesSelected={movie.id === watchlist.movieId} />)}
                    </div>

                </form>
            </div>

            <div className="inputDiv">
                <form onSubmit={handleSubmit}>

                    <FormInput
                        inputType={"checkbox"} //boolean checkbox
                        identifier={"watched"}
                        labelText={"Watched"}
                        currVal={watchlist.watched}
                        onChangeHandler={inputChangeHandler}
                    />

                    <FormInput
                        inputType={"checkbox"} //boolean checkbox
                        identifier={"watchLater"}
                        labelText={"Watch Later"}
                        currVal={watchlist.watchLater}
                        onChangeHandler={inputChangeHandler}
                    />
                    <div className="review-container">
                        <button type='submit' className="btn addButton">Add</button>
                        <button className="btn review-cancelButton"><Link to="/" id="cancelButton">Cancel</Link></button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddWatchlist;