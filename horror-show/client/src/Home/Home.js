import './Home.css';
import React, {useEffect, useState} from "react";
import Movie from "../Movie/Movie";

function Home() {

    const url = "https://api.themoviedb.org/3/discover/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&with_genres=27";

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        fetchHorror();
    }, []);

    const fetchHorror = async () => {
        const data = await fetch(url);
        const movies = await data.json();
        console.log(movies);
        setMovie(movies.results);
    };

    return (
        
        <main>
            <div className="container">
                <h1>Welcome to Horror Show</h1>
            
        

            {movie.map((movies) => {
                return <Movie key={movie.id} movie={movie}/>;
            })}
            </div>
      </main>
    );
};

export default Home;