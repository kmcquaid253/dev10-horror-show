import React, { useState, createContext, useEffect } from 'react';

export const DataContext = createContext()

export const DataProvider = (props) => {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const [watchLater, setWatchLater] = useState([]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&language=en-US&page=1&include_adult=false&query=${e.target.value}`
        )
            .then((response) => response.json())
            .then((data) => setMovies(data));
    };

    const handlePageChange = (page) => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&language=en-US&page=1&include_adult=false&query=${search}`
        )
            .then((response) => response.json())
            .then((data) => setMovies(data));
    };

    return (
        <DataContext.Provider value={{handleSearch, movies, handlePageChange, watchLater, setWatchLater}}>{props.children}</DataContext.Provider>
    )
}