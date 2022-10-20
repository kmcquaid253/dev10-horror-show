import '../Home/Home.css';
import React, {useEffect, useState} from "react";
import FriendMovieCard from './FriendMovieCard';

function FriendMovieList() {

    const url = "https://api.themoviedb.org/3/discover/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_genres=27&with_watch_monetization_types=flatrate";

    const API_IMG = "https://image.tmdb.org/t/p/w500/"

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(url)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setMovies(data.results);
        })
    }, []);


    return (
        
        <main>
            <div className="container">
                <h1>Friend's Watched Movies</h1>
                <div className="grid">
                <a className="movieLink" 
                href={`/movieDisplay/${movies.id}`}></a>
                    {movies.map((movie) =>
                    <FriendMovieCard key ={movie.id} {...movie}/>)}
                
                </div>
            </div>
      </main>
    );
};

export default FriendMovieList;