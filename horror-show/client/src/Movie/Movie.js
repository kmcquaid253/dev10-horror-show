function Movie(props) {

    const API_KEY ="api_key=afceef8d4ccab842b5c75f90eb06de9f";
    const BASE_URL ="https://api.themoviedb.org/4"

    return (
        <div className="card">
             <img src="images/post.jpg" className="poster"></img>
             <div className="box">
                <h4 className="original_title">Title</h4>
             </div>
            </div>
    )
}

export default Movie;