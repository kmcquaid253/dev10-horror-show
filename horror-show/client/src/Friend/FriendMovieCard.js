import React from 'react';


function FriendMovieCard({ title, poster_path, overview}) {

    const movieUrl = "https://api.themoviedb.org/3/movie/{movie_id}?api_key=afceef8d4ccab842b5c75f90eb06de9f&language=en-US";

    const API_IMG = "https://image.tmdb.org/t/p/w500/";

    const getPosterUrl = (posterpath) => {
        return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`;
    } 


    return (
        <div className="card">
            <div className="card-body">

                <img className="card-img" src={getPosterUrl(poster_path)} alt={title + " " + overview}></img>
                        <h5>{title}</h5>
                        </div>
                    
            </div>
    )
}

export default FriendMovieCard;