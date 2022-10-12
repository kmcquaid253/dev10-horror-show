import React from 'react';

function Movie({ title, poster_path, release_date, overview }) {

    const API_IMG = "https://image.tmdb.org/t/p/w500/";

    const getPosterUrl = (posterpath) => {
        return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`; // this link leads to correct movie poster
    } // don't know how to connect the object to this though

    return (
        <div className="card">
            <div className="card-header">
                <h3>{title}</h3>
                <h4>Release Date: {release_date}</h4>
                <p>{overview}</p>
            </div>
            <div className="card-body">
                <img className="card-img" src={getPosterUrl(poster_path)} alt={title + " " + overview}></img>
            </div>
        </div>
    )
}

export default Movie;