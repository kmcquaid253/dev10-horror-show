import {useEffect, useState} from 'react';
import Movie from '../Movie/Movie';

function ReviewList () {

    const [movies, setMovies] = useState([]);

    function loadAllReviews() {
        fetch("http://localhost:8080/api/review")
        .then(response => {
            if(response.status === 200) {
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
            {movies.map(m => <Movie key={m.movie.id} movieData={m}/>)}
            </>
        );
};

export default ReviewList;