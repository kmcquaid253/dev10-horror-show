import React from 'react';
import {Link} from 'react-router-dom';


function Movie({ title, poster_path, release_date, overview }) {

    const movieUrl = "https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US";

    const API_IMG = "https://image.tmdb.org/t/p/w500/";

    const getPosterUrl = (posterpath) => {
        return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`; // this link leads to correct movie poster
    } // don't know how to connect the object to this though



    return (
        <div className="card">
            <div className="card-body">
                {/* <h6>{title}</h6>
                <h6>Release Date: {release_date}</h6> */}
                {/* <p>{overview}</p> */}

                <img className="card-img" src={getPosterUrl(poster_path)} alt={title + " " + overview}></img>

            </div>
        
        </div>
    )
}

export default Movie;