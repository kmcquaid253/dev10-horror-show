import React, { useContext, useState } from 'react';
import { DataContext } from './DataContext';
import AuthContext from '../AuthContext/AuthContext';
import { updateWatchlist } from '../apiService';

export default function WatchLater() {
    const { watchLater, setWatchLater, addToWatched, watched, setWatched } = useContext(DataContext);

    const auth = useContext(AuthContext);
    const [errors, setErrors] = useState([]);

    function showErrors(listOfErrorMessages) {
        setErrors(listOfErrorMessages);
    }

    // const removeFromWatchLater = (movie) => {
    //     const updater = [...watchLater];
    //     updater.forEach((item, index) => {
    //         if (item.id === movie.id) {
    //             updater.splice(index,1);
    //         }
    //     })
    //     setWatchLater(updater);
    // }

    const moveFromLaterToSooner = (movie) => {
        let watchlist = [];
        watchlist.push(...watched);
        let index = -1;
        for ( let i = 0; i < watchLater.length; i++ ){
            if (watchLater[i].movie.id == movie.id){
                watchLater[i].watchLater = false;
                watchLater[i].watched = true;
                index = i;
            } 
            watchlist.push(watchLater[i]);
        }
        updateWatchlist(watchlist, showErrors, auth, setWatched, setWatchLater);
    }

    const removeFromWatchLater = (movieToRemove) => {
        const check = watchLater.every((item) => {
            return item.id !== movieToRemove.id;
        });

        if (check) {
            const wasWatched = watched.some((i) => {
                return i.id == movieToRemove.id;
            });
            let watchlist = [];
            
            if (wasWatched) {
                for (let i = 0; i < watched.length; i++){
                    if (movieToRemove.id == watched[i].movie.id){
                        watched[i].watchLater = false;
                    }
                    watchlist.push(watched[i]);
                }
            } else {
                watchlist = [...watched]; 
            }
            for (let i = 0; i < watchLater.length; i++){
                let alreadyAdded = watchlist.some((item) => item.movie.id == watchLater[i].movie.id);
                let isMatch = (watchLater[i].movie.id == movieToRemove.id); 
                if (!alreadyAdded && !isMatch){
                    watchlist.push(watchLater[i]);
                }
            }

            updateWatchlist(watchlist, showErrors, auth, setWatched, setWatchLater);
            
        } else {
            alert("This movie isn't in your watch list! :D");
        }
    }

    console.log(watchLater);

    return (
        <div>
            <h1 id="watch-list">Watch List</h1>
            <div className="watchLater-movies-cnt">
                {watchLater ?
                    watchLater.map(({movie}) => {
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
                                        moveFromLaterToSooner(movie);
                                        // removeFromWatchLater(movie);
                                        // addToWatched(movie);
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
