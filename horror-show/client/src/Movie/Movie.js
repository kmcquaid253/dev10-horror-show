import React from 'react';

function Movie({title, poster_path, release_date, overview}) {

    const API_IMG="https://image.tmdb.org/t/p/w500/";

    return (
        <div className="card">
            <div className="card-header">
            <h3>{title}</h3>
        <h4>Release Date: {release_date}</h4>
        <p>{overview}</p>
            </div>
        <div className="card-body">
        <img className="card-img" src={API_IMG + poster_path}></img>
        </div>
        </div>
    )
}

export default Movie;