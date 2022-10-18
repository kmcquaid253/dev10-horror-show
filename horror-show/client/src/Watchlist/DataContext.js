import React, { useState, createContext, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../AuthContext/AuthContext';

export const DataContext = createContext();



export const DataProvider = (props) => {

    const auth = useContext(AuthContext);

    const [search, setSearch] = useState("");
    const [selectedMovie, setSelectedMovie] = useState();
    const [movies, setMovies] = useState([]);
    const [sidebar, setSidebar] = useState(false);
    const [selectedMovieDetails, setSelectedMovieDetails] = useState();

    const [watchLater, setWatchLater] = useState(localStorage.getItem("watchlater") 
        ? JSON.parse(localStorage.getItem("watchlater")) 
        : []
    );

    const [watched, setWatched] = useState(localStorage.getItem("watched") 
        ? JSON.parse(localStorage.getItem("watched")) 
        : []
    );

    const showSidebar = () => setSidebar(!sidebar);
    const openSidebar = () => setSidebar(true);
    
    useEffect(() => {
        localStorage.setItem("watchlater", 
        JSON.stringify(watchLater));
    }, [watchLater]);

    useEffect(() => {
        localStorage.setItem("watched", 
        JSON.stringify(watched));
    }, [watched]);


    const handleSearch = (e) => {
        setSearch(e.target.value);
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&language=en-US&page=1&include_adult=false&query=${e.target.value}`
        )
            .then((response) => response.json())
            .then((data) => setMovies(data));
    };

    //page changing

    const handlePageChange = (page) => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&language=en-US&page=${page}&include_adult=false&query=${search}`
        )
            .then((response) => response.json())
            .then((data) => setMovies(data));
    };

    //adding to watched list

    const addToWatched = (movie) => {
        const check = watched.every((item) => {
            return item.id !== movie.id;
        });
        if (check) {
            setWatched([...watched, movie]);
        } else { 
            alert("You've already seen this movie! :D");
        }
    };

    // grabs movie

    const getMovie = (id) => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=afceef8d4ccab842b5c75f90eb06de9f&language=en-US`,
        {
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
            },
        })
        .then((response) => response.json())
        .then ((data) => setSelectedMovieDetails(data));
    };

    return (
        <DataContext.Provider value={{
            handleSearch,
            movies, 
            handlePageChange, 
            watchLater, 
            setWatchLater, 
            addToWatched,
            watched,
            setWatched,
            selectedMovie,
            setSelectedMovie,
            getMovie,
            selectedMovieDetails,
            openSidebar,
            showSidebar,
            sidebar}}>{props.children}</DataContext.Provider>
    )
}