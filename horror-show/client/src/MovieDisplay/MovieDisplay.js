import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Movie from "../Movie/Movie";
import MovieCard from "./MovieCard";
import TMDB from "./TMDB";


const MovieDisplay = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&with_genres=27", 
            {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
    },[])

    return (<div className="className">
        {movies.map((movie,index)=>{
            return <Movie key={index} {...movie} />
        })}
    </div>)
}


// function MovieDisplay(){
//     const [movie, setMovieList] = useState([]);

//     const history = useHistory();


//     //https://api.themoviedb.org/3/discover/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&with_genres=27
//     //https://api.themoviedb.org/3/movie/550?api_key=afceef8d4ccab842b5c75f90eb06de9f

    // function loadAllHorrorMovies(){
    //     fetch("https://api.themoviedb.org/3/discover/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&with_genres=27", 
    //         {                        // idk if it needs GET or anything other than fetch url?
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json"
    //         },
    //     })
        
    //     .then(response => {
    //         if (response.status === 200){
    //             return response.json();
    //         }
    //         else (console.log(response))
    //     })
    //     .then (movieList => {
    //         setMovieList(movieList);
    //     })
    //     .catch(error => {
    //         if( error instanceof TypeError){
    //             history.push("/error", { msg: "Could not connect to API! 👎" });
    //         }
            
    //     });
    // }


//     useEffect(
//         () => {
//             loadAllHorrorMovies();
//         },);

//         // sends to error page from /movieDisplay
//         return (
//             loadAllHorrorMovies()
//         )
// }

export default MovieDisplay;