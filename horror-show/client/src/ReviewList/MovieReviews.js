import { useEffect, useState } from 'react';
import ReviewTile from '../AddReview/ReviewTile';
import Movie from '../Movie/Movie';

function MovieReviews() {

    const DEFAULT_REVIEW = {
        userReview: "",
        appUserId: "",
        movieId: ""
    };

    const [movies, setMovies] = useState([]);
    const [review, setReview] = useState(DEFAULT_REVIEW);//state that we track about the page, that way when it does update it will refresh the component


    function handleMovieSelect(movieId) {
        const reviewCopy = { ...review };
        reviewCopy.movieId = movieId;
        setReview(reviewCopy);
    }

    function loadAllReviews() {
        fetch("http://localhost:8080/api/review")
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else (console.log(response))
            })
            .then(reviewList => {
                setMovies(reviewList);
            });
    }

    useEffect(
        () => {
            loadAllReviews();
        }, []);

    return (
        <>
            {movies.map((movie) =>
                <ReviewTile
                    key={movie.id}
                    {...movie}
                    onMovieClick={handleMovieSelect}
                    matchesSelected={movie.id === review.movieId} />)}
        </>
    );
};

export default MovieReviews;
