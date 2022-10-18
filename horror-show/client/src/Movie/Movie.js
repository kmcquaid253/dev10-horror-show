import React from 'react';
import {useState} from "react";


function Movie({ title, poster_path, release_date, overview}) {

    const movieUrl = "https://api.themoviedb.org/3/movie/{movie_id}?api_key=afceef8d4ccab842b5c75f90eb06de9f&language=en-US";

    const API_IMG = "https://image.tmdb.org/t/p/w500/";

    const getPosterUrl = (posterpath) => {
        return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`;
    } 

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
        <button class="button button-primary close-modal">Cancel</button>
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
                    <button className="viewMoreButton" onClick={handleModalOpen}>View More</button>
            </div>
        </div>
    )
}

export default Movie;