function TMDB(){
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&with_genres=27", 
            {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
    } 

export default TMDB;