import React from 'react';
import "./Movie.css";

function MovieAddReview({ title, poster_path, release_date, id, overview }) {

    const API_IMG = "https://image.tmdb.org/t/p/w500/";

    const getPosterUrl = (posterpath) => {
        return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`; // this link leads to correct movie poster
    } // don't know how to connect the object to this though

    return (
        <div className='movies-container'>
        <div className="card">
            <a href='#'>
            <div className="card-body">
            <img className="card-img" src={getPosterUrl(poster_path)} alt={title + " " + overview + " " + id}></img>
                <h2 className='title'>{title}</h2>
                <h6 className='description'>Release Date: {release_date}</h6>
                <h6 className='info'>Movie Id: {id}</h6>
                {/* <p>{overview}</p> */}
                
            </div>
            </a>
        </div>
        </div>
    )
}

export default MovieAddReview;