import React, { useState, createContext, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../AuthContext/AuthContext';
import { updateWatchlist } from '../apiService';


export const DataContext = createContext();

export const DataProvider = ({watched,watchLater, setWatched, setWatchLater, children}) => {

    const auth = useContext(AuthContext);

    function showErrors(listOfErrorMessages) {
        setErrors(listOfErrorMessages);
    }

    const [search, setSearch] = useState("");
    const [selectedMovie, setSelectedMovie] = useState();
    const [movies, setMovies] = useState([]);
    const [errors, setErrors] = useState([]);
    const [query, setQuery] = useState('');
    const [sidebar, setSidebar] = useState(false);
    const [selectedMovieDetails, setSelectedMovieDetails] = useState();

    

    const showSidebar = () => setSidebar(!sidebar);
    const openSidebar = () => setSidebar(true);



    const handleSearch = async (e) => {
        setSearch(e.target.value);
        
        await fetch(`https://api.themoviedb.org/3/search/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&page=1&query=${e.target.value}`
        )
            .then((response) => response.json())
            .then((data) => setMovies(data));
    };

    //page changing

    const handlePageChange = (page) => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&language=en-US&page=${page}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=27&with_watch_monetization_types=flatrate&query=${search}`
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
            const wasWatchLater = watchLater.some((i) => {
                return i.id == movie.id;
            });
            let watchlist = [];
            let match = null;

            if (wasWatchLater) {
                for (let i = 0; i < watchLater.length; i++){
                    if (movie.id == watchLater[i].movie.id){
                        match = watchLater[i];
                        watchLater[i].watched = true;
                    }
                    watchlist.push(watchLater[i]);
                }
            } else {
                const watchlistItem = { movie, watched: true, watchLater: false };
                match = watchlistItem;
                watchlist = [...watchLater, watchlistItem]; 
            }
            for (let i = 0; i < watched.length; i++){
                if (!watchlist.some((item) => item.movie.id == watched[i].movie.id)){
                    watchlist.push(watched[i]);
                }
            }
            updateWatchlist(watchlist, showErrors, auth, setWatched, setWatchLater);
        } else {
            alert("This movie is already in your watch list! :D");
        }
    }

    // grabs movie

    const getMovie = (id) => {

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=afceef8d4ccab842b5c75f90eb06de9f&language=en-US`)
            .then((response) => response.json())
            .then((data) => setSelectedMovieDetails(data));
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
            sidebar
        }}>{children}</DataContext.Provider>
    )
}