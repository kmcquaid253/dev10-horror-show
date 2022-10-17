import { useEffect } from "react";
import React, { useContext } from 'react';
import { DataContext } from "./DataContext";
import './Detail.css';

export default function Detail() {
    const { selectedMovie, getMovie, selectedMovieDetails } = useContext(DataContext);

    useEffect(() => {
        getMovie(selectedMovie);
    }, []);

    return selectedMovieDetails ? (
        <div className="details-cnt">
            <div className="movie-details-title">
                <img
                    src={`https://image.tmdb.org/t/p/w500${selectedMovieDetails.backdrop_path}`}
                    id="backdrop"
                />
                <h1 id="movie-title-h1">{selectedMovieDetails.title}</h1>
                <p id="runtime">{selectedMovieDetails.runtime} min</p>
                <div className='movie-details'>
                    <img
                        id="details-poster"
                        src={`https://image.tmdb.org/t/p/w200${selectedMovieDetails.poster_path}`}
                    />
                    <div className='movie-overview'>
                        <h3>Overview:</h3>
                        <p>{selectedMovieDetails.overview}</p>
                        <h3>Genres:</h3>
                        {selectedMovieDetails.genres
                            ? selectedMovieDetails.genres.map((genre) => (
                                <span>{genre.name},</span>
                            ))
                            : null}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}