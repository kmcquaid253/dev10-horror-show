import React, { useContext } from 'react';
import { DataContext } from './DataContext';

export default function WatchLater() {
    const { watchLater, setWatchLater } = useContext(DataContext);

    return (
        <div>
            <h1 id="watch-list">Watch List</h1>
            <div className="watchLater-movies-cnt">
                {watchLater ?
                    watchLater.map((movie) => {
                        return (
                            <div className="movies-item">
                                <h3 className="movie-title">
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
                            </div>
                        );
                    }) 
                : null}
            </div>
        </div>
    );
}