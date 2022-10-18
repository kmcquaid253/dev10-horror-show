import React, { useContext } from 'react';
import { DataContext } from './DataContext';

export default function WatchLater() {
    const { watchLater, setWatchLater, addToWatched } = useContext(DataContext);

    const removeFromWatchLater = (movie) => {
        const updater = [...watchLater];
        updater.forEach((item, index) => {
            if (item.id === movie.id) {
                updater.splice(index,1);
            }
        })
        setWatchLater(updater);
    }

    return (
        <div>
            <h1 id="watch-list">Watch List</h1>
            <div className="watchLater-movies-cnt">
                {watchLater ?
                    watchLater.map((movie) => {
                        return (
                            <div className="movies-item">
                                <h3 className="movie-title-list">
                                {movie.title}</h3>
                                {movie.poster_path ? (
                                    <img
                                        className="movie-poster"
                                        alt={`${movie.title} poster`}
                                        src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                                    />
                                ) : (
                                    <div className="noimage">
                                        <p>Poster unavailable</p>
                                    </div>
                                )}
                                <div className="movie-buttons"></div>
                                <button
                                    className="movie-btn"
                                    onClick={() => {
                                        removeFromWatchLater(movie);
                                    }}
                                > Remove
                                </button>
                                <button
                                    className="movie-btn"
                                    onClick={() => {
                                        removeFromWatchLater(movie);
                                        addToWatched(movie);
                                    }}
                                > Watched
                                </button>
                            </div>
                        );
                    }) 
                : null}
            </div>
        </div>
    );
}
