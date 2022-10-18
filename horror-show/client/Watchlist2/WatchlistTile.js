import React from 'react';
import {Link} from "react-router-dom";

function WatchlistTile({ title, poster_path, id, overview, onMovieClick, matchesSelected, watchlistId, movie, appUserId }) {

    const movieUrl = "https://api.themoviedb.org/3/movie/{movie_id}?api_key=afceef8d4ccab842b5c75f90eb06de9f&language=en-US";
    
    const API_IMG = "https://image.tmdb.org/t/p/w500/";

    const getPosterUrl = (posterpath) => {
        return `https://image.tmdb.org/t/p/w220_and_h330_face${posterpath}`; 
    } 


    const grabById = () => {
        onMovieClick(id);
    }


    return (
        <div className="card">
            <div className="card-body">
            {/* <img className="card-img" src={getPosterUrl(poster_path)} alt={movie.overview + " " + movie.id}></img> */}
                <h2 className='title'>{movie.title}</h2>
                <h3 className='appUserId'>{appUserId}</h3>
                <h6 className='userWatchlist'>Movie:<br/></h6>
                <div className="card-header">
                <button className="btn watchlistTile-delete" ><Link to={"/watchlist/delete/" + watchListId} className="navbar-textdecoration">Delete</Link></button>
                    <button className="btn watchlistTile-edit"><Link to={"/watchlist/edit/" + watchListId} className="navbar-textdecoration">Edit</Link></button>
                </div>
                {/* <h6 className='info'>Movie Id: {id}</h6> */}
                {/* <p>{overview}</p> */}
            </div>
        </div>
        // </div>
        
    )
}

export default WatchlistTile;