import { useEffect, useState } from 'react';
import ReviewTile from '../AddReview/ReviewTile';
import {useParams} from "react-router-dom";


function MovieReviews() {

    const{appUserId} = useParams();

    const DEFAULT_REVIEW = {
        userReview: "",
        appUserId: "",
        movieId: ""
    };

    const [movies, setMovies] = useState([]);
    const [review, setReview] = useState(DEFAULT_REVIEW);


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
        <div className='card-body'>
            { 
            movies.map((movie) =>
                <ReviewTile
                    key={movie.id}
                    {...movie}
                    onMovieClick={handleMovieSelect}
                    matchesSelected={movie.id === review.movieId}/>)}
        </div>
        </>
    );
};

export default MovieReviews;