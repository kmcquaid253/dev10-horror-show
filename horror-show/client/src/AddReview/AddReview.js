import FormInput from "../FormInput/FormInput";
import { useParams, Link, useHistory } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import './AddReview.css';
import AddReviewTile from "../Movie/AddReviewTile";
import AuthContext from "../AuthContext/AuthContext";

const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&query";


function AddReview() {

    const DEFAULT_REVIEW = {
        userReview: "",
        appUserId: "",
        movieId: ""
    };

    const [errors, setErrors] = useState([]);
    const [review, setReview] = useState(DEFAULT_REVIEW);//state that we track about the page, that way when it does update it will refresh the component
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const auth = useContext(AuthContext);

    const history = useHistory();

    function handleMovieSelect(movieId) {
        const reviewCopy = { ...review };
        reviewCopy.movieId = movieId;
        setReview(reviewCopy);
    }
    //can change styling based on if it matches on selected


    function handleSubmit(event) {//take in an event to prevent it from posting
        event.preventDefault();

        //Use fetch to POST to the service
        fetch("http://localhost:8080/api/review", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${auth.user.token}`,
            },
            body: JSON.stringify(review),
        })
            //fetch returns a response
            .then(async response => {
                if (response.status === 201) {

                    //Invoking this hook returns an object
                    //if successful...
                    history.push("/reviewlist");
                    return response.json();
                }
                return Promise.reject(await response.json());

            })
            .catch(error => {
                if (error instanceof TypeError) {
                    setErrors(["Could not connect to the api."]);//put string into an array because it's handeling multiple error messages
                } else {
                    setErrors(error);
                }
            });
    }


    function inputChangeHandler(inputChangedEvent) {
        const propertyName = inputChangedEvent.target.name;//We are using the property name to update the value
        const newValue = inputChangedEvent.target.value;

        const reviewCopy = { ...review };

        reviewCopy[propertyName] = newValue;

        setReview(reviewCopy);
    }

    const searchMovie = async (e) => {
        e.preventDefault();
        console.log("Searching");
        try {
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


    //movieId had to be an int and it's getting a string on the form atm resulting in an error.
    //what variable from the database should we use to lookup a movie?
    return (
        <div className='container'>
            <h2>Add Review:</h2>
            <div className="searchDiv">
                <form onSubmit={searchMovie}>
                    <FormInput className="d-flex" onSubmit={searchMovie} autoComplete="off"

                        inputType={"search"}
                        identifier={"movieReview"}
                        labelText={"Movie Title Search"}
                        currVal={query}
                        onChangeHandler={changeHandler}

                    />

                    <button variant="secondary" className="searchButton" type="submit">Search</button>

                    <div className="grid">
                        {movies.map((movie) =>
                            <AddReviewTile key={movie.id} {...movie} onMovieClick={handleMovieSelect} matchesSelected={movie.id === review.movieId} />)}
                    </div>

                </form>
            </div>

            <div className="inputDiv">
            <form onSubmit={handleSubmit}>
                {/* <FormInput
                    inputType={"text"}
                    identifier={"movieId"}
                    labelText={"Movie Title"}
                    currVal={review.movieId}
                    onChangeHandler={inputChangeHandler} /> */}

                <FormInput
                    inputType={"text"}
                    identifier={"userReview"}
                    labelText={"User Review"}
                    currVal={review.userReview}
                    onChangeHandler={inputChangeHandler}
                />
                {/* <FormInput
                    inputType={"number"}
                    identifier={"appUserId"}
                    labelText={"User Id"}
                    currVal={review.appUserId}
                    onChangeHandler={inputChangeHandler}
                /> */}
                
                <button type='submit' className="addButton">Add</button>
                <button className="cancelButton"><Link to="/" className="btn" id="cancelButton">Cancel</Link></button>
            </form>
            </div>
        </div>
    );
}

export default AddReview;