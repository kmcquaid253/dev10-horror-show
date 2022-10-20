import { useContext, useState } from 'react';
import { DataContext } from './DataContext';
import { useHistory } from 'react-router-dom';
import WatchLater from './WatchLater';
import "./WatchlistPage.css";
import { updateWatchlist } from '../apiService';
import AuthContext from '../AuthContext/AuthContext';
import Error from '../Error/Error';

export default function WatchlistPage() {

    const auth = useContext(AuthContext);
    const [errors, setErrors] = useState([]);

    function showErrors(listOfErrorMessages) {
        setErrors(listOfErrorMessages);
    }

    const { handleSearch,
        movies,
        handlePageChange,
        watchLater,
        setWatchLater,
        addToWatched,
        watched,
        setWatched,
        setSelectedMovie,
        sidebar,
        openSidebar,
        showSidebar } = useContext(DataContext);

    let history = useHistory();

    const addToWatchLater = (movie) => {
        const check = watchLater.every((item) => {
            return item.id !== movie.id;
        });
        if (check) {
            const wasWatched = watched.some((i) => {
                return i.id == movie.id;
            });
            let watchlist = [];
            let match = null;

            if (wasWatched) {
                for (let i = 0; i < watched.length; i++) {
                    if (movie.id == watched[i].movie.id) {
                        match = watched[i];
                        watched[i].watchLater = true;
                    }
                    watchlist.push(watched[i]);
                }
            } else {
                const watchlistItem = { movie, watched: false, watchLater: true };
                match = watchlistItem;
                watchlist = [...watched, watchlistItem];
            }
            for (let i = 0; i < watchLater.length; i++) {
                if (!watchlist.some((item) => item.movie.id == watchLater[i].movie.id)) {
                    watchlist.push(watchLater[i]);
                }
            }

            updateWatchlist(watchlist, showErrors, auth, setWatched, setWatchLater);
            
        } else {
            alert("This movie is already in your watch list! :D");
        }
    }

    const goToPage = (movie) => {
        setSelectedMovie(movie.id);
        let str = movie.title;
        str = str.replace(/\s+/g, "-").toLowerCase();
        history.push(`/details/${str}`);
    }

    return (
        <div className="main-cnt">
            {errors.map((error, i) =>
            (
                <Error key={i} msg={error} />
            ))}
            <h1>Search for movies!</h1>
            <input
                type="text"
                autoComplete='off'
                placeholder="Search.."
                id="search-input"
                onChange={handleSearch}
            />

            <div className={sidebar ? "side-menu active" : "side-menu"}>
                <div className='close-siderbar-cnt'>
                    <p onClick={showSidebar}>X</p>
                </div>
                <WatchLater />
            </div>

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
            <div className="grid">
                <div className="movies-cnt">
                    {movies.results
                        ? movies.results.map((movie) => {
                            return (
                                <div className="movies-item">
                                    <h1 className="movie-title">{movie.title}</h1>
                                    {movie.poster_path ? (
                                        <img
                                            className="movie-poster"
                                            alt={`${movie.title} poster`}
                                            src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                                            onClick={() => {
                                                goToPage(movie);
                                            }}
                                        />
                                    ) : (
                                        <div className="noImage">
                                            <p>Poster not available :(</p>
                                        </div>
                                    )}
                                    <div className="watch-buttons">
                                        <button className="movie-btn" onClick={() => {
                                            addToWatchLater(movie);
                                            openSidebar();
                                        }}>Watch Later</button>

                                        <button className="movie-btn" onClick={() => {
                                            addToWatched(movie);
                                        }}>Watched</button>
                                    </div>
                                </div>
                            );
                        }) : null}
                </div>
            </div >
        </div>
    );
}