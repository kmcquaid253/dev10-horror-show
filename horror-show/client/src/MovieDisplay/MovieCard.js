const getPosterUrl = (posterpath) => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`
}

// may not need this class if TMDB fetch works better in other way

const MovieCard = ({poster_path, name, first_air_date}) => {
    return <div className="className">
                <img src={getPosterUrl(poster_path)} alt={name} classname="className" />
                <h1 className="font-bold">{name}</h1>
                <p className="font-normal">{first_air_date}</p>
                </div>

}

export default MovieCard;