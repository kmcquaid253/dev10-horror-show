import React, { useContext } from 'react';
import { DataContext } from './DataContext';

export default function Watched() {
    const { watched, setWatched } = useContext(DataContext);

    const removeFromWatched = (movie) => {
        const updater = [...watched];
        updater.forEach((item, index) => {
            if (item.id === movie.id) {
                updater.splice(index, 1);
            }
        });
        setWatched(updater);
    }

    return (<div>
        <h1 id='watched-header'>Movies you've watched:</h1>
        <div className="watched-movies-cnt">
            {watched ?
                watched.map(({movie}) => {
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
                                    removeFromWatched(movie);
                                }}
                            > Remove
                            </button>
                        </div>
                    );
                })
                : null}
        </div>
    </div>
    );

}