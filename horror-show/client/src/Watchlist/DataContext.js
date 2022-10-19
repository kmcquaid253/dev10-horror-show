import React, { useState, createContext, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../AuthContext/AuthContext';
import { updateWatchlist } from '../apiService';


export const DataContext = createContext();



export const DataProvider = (props) => {

    const auth = useContext(AuthContext);

    function showErrors(listOfErrorMessages) {
        setErrors(listOfErrorMessages);
    }

    const [search, setSearch] = useState("");
    const [selectedMovie, setSelectedMovie] = useState();
    const [movies, setMovies] = useState([]);
    const [errors, setErrors] = useState([]);
    const [sidebar, setSidebar] = useState(false);
    const [selectedMovieDetails, setSelectedMovieDetails] = useState();

    const [watchLater, setWatchLater] = useState
    (localStorage.getItem("watchlater") ? JSON.parse(localStorage.getItem("watchlater")) : []
    );

    const [watched, setWatched] = useState(localStorage.getItem("watched")
        ? JSON.parse(localStorage.getItem("watched"))
        : []
    );

    const showSidebar = () => setSidebar(!sidebar);
    const openSidebar = () => setSidebar(true);

    useEffect(() => {
        if (auth.user.token == localStorage.getItem(auth.token)) {
            localStorage.setItem("watchlater",
                JSON.stringify(watchLater));
        }
    }, [watchLater]);

    useEffect(() => {
        if (auth.user.userId == localStorage.getItem(auth.token)) {
            localStorage.setItem("watched",
                JSON.stringify(watched));
        }
    }, [watched]);


    const handleSearch = (e) => {
        setSearch(e.target.value);
        
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27&with_watch_monetization_types=flatrate&query=${e.target.value}`
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
            updateWatchlist(watchlist, showErrors, auth);
            setWatched([...watched, match]);
        } else {
            alert("This movie is already in your watch list! :D");
        }
    }

    // grabs movie

    const getMovie = (id) => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=afceef8d4ccab842b5c75f90eb06de9f&language=en-US`,
            {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                },
            })
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
        }}>{props.children}</DataContext.Provider>
    )
}