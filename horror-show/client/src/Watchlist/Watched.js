import React, { useContext, useState } from 'react';
import { DataContext } from './DataContext';
import { updateWatchlist } from '../apiService';
import AuthContext from '../AuthContext/AuthContext';



export default function Watched() {
    const { watched, setWatched, watchLater, setWatchLater} = useContext(DataContext);

    const auth = useContext(AuthContext);
    const [errors, setErrors] = useState([]);


    function showErrors(listOfErrorMessages) {
        setErrors(listOfErrorMessages);
    }

    // const removeFromWatched = (movie) => {
    //     const updater = [...watched];
    //     updater.forEach((item, index) => {
    //         if (item.id === movie.id) {
    //             updater.splice(index, 1);
    //         }
    //     });
    //     setWatched(updater);
    // }


    const removeFromWatched = (movieToRemove) => {
        const check = watched.every((item) => {
            return item.id !== movieToRemove.id;
        });

        if (check) {
            const wasWatchLater = watchLater.some((i) => {
                return i.id == movieToRemove.id;
            });
            let watchlist = [];
            
            if (wasWatchLater) {
                for (let i = 0; i < watchLater.length; i++){
                    if (movieToRemove.id == watchLater[i].movie.id){
                        watchLater[i].watched = false;
                    }
                    watchlist.push(watchLater[i]);
                }
            } else {
                watchlist = [...watchLater]; 
            }
            for (let i = 0; i < watched.length; i++){
                let alreadyAdded = watchlist.some((item) => item.movie.id == watched[i].movie.id);
                let isMatch = (watched[i].movie.id == movieToRemove.id); 
                if (!alreadyAdded && !isMatch){
                    watchlist.push(watched[i]);
                }
            }

            updateWatchlist(watchlist, showErrors, auth, setWatched, setWatchLater);
        } else {
            alert("This movie isn't in your watched list! :D");
        }
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