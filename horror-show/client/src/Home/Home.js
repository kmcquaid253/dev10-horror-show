import './Home.css';
import React, {useEffect, useState} from "react";
import Movie from "../Movie/Movie";

function Home() {

    const url = "https://api.themoviedb.org/3/discover/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&language=en-US&sort_by=popularity.desc&page=1&with_genres=27";

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
        <>
        <video autoPlay loop muted play inline className="back-video">
            <source src="forest.mp4" type="video/mp4"/>
        </video>
        <main>
            <div className="container">
                <h1 className='welcome-h1-message'>Welcome to Horror Show</h1>
                <div className="grid">
                <a className="movieLink" 
                href={`/movieDisplay/${movies.id}`}></a>
                    {movies.map((movie) =>
                    <Movie key ={movie.id} {...movie}/>)}
                
                </div>
            </div>
      </main>
      </>
    );
};

export default Home;