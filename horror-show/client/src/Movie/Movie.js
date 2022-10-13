import React from 'react';
import {useState} from "react";
import MovieDisplay from '../MovieDisplay/MovieDisplay';


function Movie({ title, poster_path, release_date, overview }) {

    const movieUrl = "https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US";

    const API_IMG = "https://image.tmdb.org/t/p/w500/";

    const getPosterUrl = (posterpath) => {
        return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`; // this link leads to correct movie poster
    } // don't know how to connect the object to this though

    const [show, setShow] = useState(false);

    const handleModalClose = (e) => {
        const currentClass = e.target.className;

        if(currentClass === 'modal-card') {
            return;
        }
        setShow(false);
    };

    const handleModalOpen = () => {
        setShow(true);
    };



    return (
        <div className="card">
            <div className="card-body">
                <img className="card-img" src={getPosterUrl(poster_path)} alt={title + " " + overview}></img>
                <div hidden={!show}>
                        <div className="modal-background" onClick={handleModalClose}>
                        <h5>{title}</h5>
                        <h6>Release Date: {release_date}</h6>
                        <p>{overview}</p>
                            <div className="modal-card">

                            </div>
                        </div>
                    </div>
                    <button className="button" onClick={handleModalOpen}>View More</button>

            </div>
        
        </div>
    )
}

export default Movie;