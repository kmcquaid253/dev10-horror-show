import { useEffect, useState } from 'react';
import WatchlistTile from './WatchlistTile';

function MovieWatchlist() {

    const DEFAULT_Watchlist = {
        appUserId: "",
        movieId: ""
    };

    const [movies, setMovies] = useState([]);
    const [watchlist, setWatchlist] = useState(DEFAULT_Watchlist);


    function handleMovieSelect(movieId) {
        const watchlistCopy = { ...watchlist };
        watchlistCopy.movieId = movieId;
        setWatchlist(watchlistCopy);
    }

    function loadAllWatchlists() {
        fetch("http://localhost:8080/api/watchlist")
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else (console.log(response))
            })
            .then(watchlistList => {
                setMovies(watchlistList);
            });
    }

    useEffect(
        () => {
            loadAllWatchlists();
        }, []);
    return (
        <>
            <div className='card-body'>
                {
                    movies.map((movie) =>
                        <WatchlistTile
                            key={movie.id}
                            {...movie}
                            onMovieClick={handleMovieSelect}
                            matchesSelected={movie.id === watchlist.movieId} />)}
            </div>
        </>
    );
};

export default MovieWatchlist;