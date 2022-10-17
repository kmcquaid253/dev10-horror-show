import React from 'react';
import "./AddReviewTile.css";

function AddReviewTile({ title, poster_path, release_date, id, overview, onMovieClick, matchesSelected }) {

    const API_IMG = "https://image.tmdb.org/t/p/w500/";

    const getPosterUrl = (posterpath) => {
        return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`; 
    } 


    const grabById = () => {
        onMovieClick(id);
    }

    return (
        <>
        <div className={'movies-container' + (matchesSelected ? ' movies-container-selected' : '')} onClick={grabById}>
        <div className="card">
            <a href='#'>
            <div className="card-body">
            <img className="card-img" src={getPosterUrl(poster_path)} alt={title + " " + overview + " " + id}></img>
                <h2 className='title'>{title}</h2>
                <h6 className='description'>Release Date:<br/> {release_date}</h6>
                {/* <h6 className='info'>Movie Id: {id}</h6> */}
                {/* <p>{overview}</p> */}
                
            </div>
            </a>
        </div>
        </div>
        </>
    )
}

export default AddReviewTile;