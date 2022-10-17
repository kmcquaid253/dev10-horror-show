import React from 'react';
import "./AddReviewTile.css";
import {Link} from "react-router-dom";

function ReviewTile({ title, poster_path, id, overview, onMovieClick, matchesSelected, userReview, reviewId, movie }) {

    const movieUrl = "https://api.themoviedb.org/3/movie/{movie_id}?api_key=afceef8d4ccab842b5c75f90eb06de9f&language=en-US";
    
    const API_IMG = "https://image.tmdb.org/t/p/w500/";

    const getPosterUrl = (posterpath) => {
        return `https://image.tmdb.org/t/p/w220_and_h330_face${posterpath}`; // this link leads to correct movie poster
    } // don't know how to connect the object to this though


    const grabById = () => {
        onMovieClick(id);
    }


    return (
        // <div className={'movies-container' + (matchesSelected ? ' movies-container-selected' : '')} onClick={grabById}>
        <div className="card">
            <div className="card-body">
            {/* <img className="card-img" src={getPosterUrl(poster_path)} alt={movie.overview + " " + movie.id}></img> */}
                <h2 className='title'>{movie.title}</h2>
                <h6 className='userReview'>Review:<br/> {userReview}</h6>
                <div className="card-header">
                <button className="btn reviewTile-delete" ><Link to={"/reviews/delete/" + reviewId}>Delete</Link></button>
                    <button className="btn reviewTile-edit"><Link to={"/reviews/edit/" + reviewId}>Edit</Link></button>
                </div>
                {/* <h6 className='info'>Movie Id: {id}</h6> */}
                {/* <p>{overview}</p> */}
            </div>
        </div>
        // </div>
        
    )
}

export default ReviewTile;