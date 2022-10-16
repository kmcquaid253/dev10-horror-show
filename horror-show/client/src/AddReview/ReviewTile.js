import React from 'react';
import "./AddReviewTile.css";
import {Link} from "react-router-dom";

function ReviewTile({ title, poster_path, id, overview, onMovieClick, matchesSelected, userReview, reviewId, movie }) {

    
    const API_IMG = "https://image.tmdb.org/t/p/w500/";

    const getPosterUrl = (posterpath) => {
        return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`; // this link leads to correct movie poster
    } // don't know how to connect the object to this though


    const grabById = () => {
        onMovieClick(id);
    }


    return (
        // <div className={'movies-container' + (matchesSelected ? ' movies-container-selected' : '')} onClick={grabById}>
        <div className="card">
                   <button className="float-end btn btn-sm btn-danger" ><Link to={"/reviews/delete/" + reviewId}>Delete</Link></button>
            <a href='#'>
                <div className="card-header">
                    <h5 className="editReview"><Link to={"/review/edit/" + reviewId}>{userReview}</Link></h5>
                </div>
            <div className="card-body">
            <img className="card-img" src={getPosterUrl(poster_path)} alt={movie.overview + " " + movie.id}></img>
                <h2 className='title'>{movie.title}</h2>
                <h6 className='userReview'>Review:<br/> {userReview}</h6>
                {/* <h6 className='info'>Movie Id: {id}</h6> */}
                {/* <p>{overview}</p> */}
                
            </div>
            </a>
        </div>
        // </div>
        
    )
}

export default ReviewTile;