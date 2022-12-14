import FormInput from "../FormInput/FormInput";
import Error from "../Error/Error";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from 'react';
import './AddReview.css';
import AddReviewTile from "./AddReviewTile";
import AuthContext from "../AuthContext/AuthContext";
import Messages from "../Messages/Messages"

const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&query";


function AddReview() {

    const DEFAULT_REVIEW = {
        userReview: "",
        appUserId: "",
        movieId: ""
    };


    const [search, setSearch] = useState("");
    const [review, setReview] = useState(DEFAULT_REVIEW);//state that we track about the page, that way when it does update it will refresh the component
    const [movies, setMovies] = useState([]);
    const [id, setId] = useState([]);
    const [query, setQuery] = useState('');
    const auth = useContext(AuthContext);
    const [errors, setErrors] = useState([]);

    const history = useHistory();


    function showErrors(listOfErrorMessages) {
        setErrors(listOfErrorMessages);
    }


    function handleMovieSelect(movieId) {
        const reviewCopy = { ...review };
        reviewCopy.movieId = movieId;
        setReview(reviewCopy);
    }
    //can change styling based on if it matches on selected

    function addReview() {

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
            .catch(errorRequest => {
                if (errorRequest instanceof TypeError) {
                    showErrors(["Could not connect to the api."]);//put string into an array because it's handeling multiple error messages
                } else {
                    showErrors(errorRequest);
                }
            });
    }

    function addMovieAndReview() {
        const movie = movies.find((m) => m.id === review.movieId);

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
                addReview();
            }
        }).catch(error => {

            showErrors(error);

        });
    }


    function handleSubmit(event) { //take in an event to prevent it from posting
        event.preventDefault();

        addMovieAndReview();
    };

    //page changing

    const handlePageChange = (page) => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&language=en-US&page=${page}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=27&with_watch_monetization_types=flatrate&query=${search}`
        )
            .then((response) => response.json())
            .then((data) => setMovies(data));
    };


    function inputChangeHandler(inputChangedEvent) {
        const propertyName = inputChangedEvent.target.name; //We are using the property name to update the value
        const newValue = inputChangedEvent.target.value;

        const reviewCopy = { ...review };

        reviewCopy[propertyName] = newValue;

        setReview(reviewCopy);
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
<>
        <video autoPlay loop muted play inline class="back-video">
            <source src="fire4.mp4" type="video/mp4"/>
        </video>
        <div className='container'>
            {errors.map((error, i) =>
            (
                <Error key={i} msg={error} />
            ))}
            <h2 className="addReview">Add Review:</h2>
            <h6 className="add-review-error-messages"><div id="messages" role="alert"></div></h6>
            <div className="searchDiv">
                <form onSubmit={searchMovie}>
                    <FormInput className="d-flex" onSubmit={searchMovie} autoComplete="off"

                        inputType={"search"}
                        identifier={"movieReview"}
                        labelText={"Movie Title Search"}
                        currVal={query}
                        onChangeHandler={changeHandler}
                    />

                    {movies.page ? (
                        <div>
                            <p id='pages-p'>
                                Page {movies.page} of {movies.total_pages}
                            </p>
                            <p id="pages-p">{movies.total_results} results</p>
                            <button
                                className="movie-btn"
                                onClick={() => {
                                    if (movies.page !== 1) {
                                        handlePageChange(movies.page - 1);
                                    }
                                }}
                            >
                                Previous page
                            </button>
                            <button
                                className="movie-btn"
                                onClick={() => {
                                    if (movies.page !== movies.total_pages) {
                                        handlePageChange(movies.page + 1);
                                    }
                                }}
                            >
                                Next page
                            </button>
                        </div>
                    ) : null
                    }

                    <button variant="secondary" className="searchButton" type="submit">Search</button>

                    <div className="grid">
                        {movies.map((movie) =>
                            <AddReviewTile key={movie.id} {...movie} onMovieClick={handleMovieSelect} matchesSelected={movie.id === review.movieId} />)}
                    </div>
                </form>



            </div>

            <div className="inputDiv">
                <Messages errorMessages={errors} />
                <form onSubmit={handleSubmit}>

                    <FormInput
                        inputType={"textarea"}
                        identifier={"userReview"}
                        labelText={"User Review"}
                        currVal={review.userReview}
                        onChangeHandler={inputChangeHandler}
                    />
                    <div className="review-container">
                        <button type='submit' className="btn addButton">Add</button>
                        <button className="btn review-cancelButton"><Link to="/" id="cancelButton" className="navbar-textdecoration">Cancel</Link></button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default AddReview;