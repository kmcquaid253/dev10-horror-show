import React, { useContext } from 'react';
import { DataContext } from './DataContext';

export default function MainPage() {

    const { handleSearch,
            movies,
            handlePageChange,
            watchLater,
            setWatchLater } = useContext(DataContext);

    console.log(watchLater);

    const addToWatchLater = (movie) => {
        const check = watchLater.every(item => {
            return item.id !== movie.id
        })
        if (check) {
            setWatchLater([...watchLater, movie]);
        } else {
            alert("This movie is already in your watch list");
        }
    }

    return (
        <div className="main-cnt">
            <h1>Search for movies!</h1>
            <input
                type="text"
                autoComplete='off'
                placeholder="Search.."
                id="search-input"
                onChange={handleSearch}
            />
            {movies.page ? (
                <div>
                    <p id='pages-p'>
                        Page {movies.page} of {movies.total_pages}
                    </p>
                    <p id="pages-p">{movies.total_results} results</p>
                    <button
                        className="page-btn"
                        onClick={() => {
                            if (movies.page != 1) {
                                handlePageChange(movies.page - 1);
                            }
                        }}
                    >
                        Previous page
                    </button>
                    <button
                        className="page-btn"
                        onClick={() => {
                            if (movies.page != movies.total_pages) {
                                handlePageChange(movies.page + 1);
                            }
                        }}
                    >
                        Next page
                    </button>
                </div>
            ) : null
            }
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
                                    />
                                ) : (
                                    <div className="noImage">
                                        <p>Poster not available</p>
                                    </div>
                                )}
                                <div className="movie-buttons">
                                    <button className="movie-btn" onClick={() => addToWatchLater(movie)}>Watch Later</button>

                                    <button className="movie-btn">Watched</button>
                                </div>
                            </div>
                        );
                    }) : null}
            </div>
        </div >
    );
}