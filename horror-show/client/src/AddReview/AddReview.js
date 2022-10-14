import FormInput from "../FormInput/FormInput";
import {Link, useHistory } from "react-router-dom";
import {useState} from 'react';
import './AddReview.css';
import Movie from "../Movie/MovieAddReview";
const API_SEARCH="https://api.themoviedb.org/3/search/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&query";

function AddReview(){

    const DEFAULT_REVIEW = {
        userReview: "",
        //appUserId: "",
        movieId: ""
    };

    const [errors, setErrors] = useState([]);
    const[review, setReview] = useState(DEFAULT_REVIEW);//state that we track about the page, that way when it does update it will refresh the component
    const [movies, setMovies]=useState([]);
    const [query, setQuery]=useState('');

    const history = useHistory();

    function handleSubmit(event){//take in an event to prevent it from posting
        event.preventDefault();

        //Use fetch to POST to the service
        fetch("http://localhost:8080/api/review/reviewId",{
            method: "POST",
            body: JSON.stringify(review),
            headers: {
                "Content-Type": "application/json"
            }
        })
        //fetch returns a response
        .then(async response => {
            if(response.status === 201){
                //Invoking this hook returns an object
                //if successful...
                history.push("/home");
            }
            return Promise.reject(await response.json());
            
        })
        //when response.json happens...
        //returns hydrated reviews
        .then(addedReview =>  history.push("/home"))
        .catch(error => {
            if(error instanceof TypeError){
                setErrors(["Could not connect to the api."]);//put string into an array because it's handeling multiple error messages
            } else{
                setErrors(error);
            }
        });
    }


    function inputChangeHandler(inputChangedEvent){
        const propertyName = inputChangedEvent.target.name;//We are using the property name to update the value
        const newValue = inputChangedEvent.target.value;

        const reviewCopy = {...review};

        reviewCopy[propertyName] = newValue;

        setReview(reviewCopy);
    }

    const searchMovie = async(e)=>{
        e.preventDefault();
        console.log("Searching");
        try{
          const url=`https://api.themoviedb.org/3/search/movie?api_key=afceef8d4ccab842b5c75f90eb06de9f&query=${query}`;
          //const url=`https://api.themoviedb.org/3/movie/{movie_id}?api_key=afceef8d4ccab842b5c75f90eb06de9f&language=en-US`;
          const res= await fetch(url);
          const data= await res.json();
          console.log(data);
          setMovies(data.results);
        }
        catch(e){
          console.log(e);
        }
      }
    
      const changeHandler=(e)=>{
        setQuery(e.target.value);
      }


    //movieId had to be an int and it's getting a string on the form atm resulting in an error.
    //what variable from the database should we use to lookup a movie?
    return(
        <div className='container'>
                <h4>Add Review:</h4>
                
                <form onSubmit={searchMovie}>
                    <FormInput className="d-flex" onSubmit={searchMovie} autoComplete="off"
                    
                    inputType={"search"}
                    identifier={"movieReview"}
                    labelText={"Movie Title"}
                    currVal={query} 
                    onChangeHandler={changeHandler}
                    
                    />
                    
                    <button variant="secondary" type="submit">Search</button>

                    <div className="grid">
                    {movies.map((movie) =>
                    <Movie key ={movie.id} {...movie}/>)}
                </div>

                </form>     
          
                <form onSubmit={handleSubmit}>
                    {/* <FormInput 
                        inputType={"text"} 
                        identifier={"movieId"} 
                        labelText={"Movie Title"}
                        currVal={review.movieId} 
                        onChangeHandler={inputChangeHandler}/> */}
                    
                    <FormInput 
                        inputType={"text"} 
                        identifier={"userReview"} 
                        labelText={"User Review"}
                        currVal={review.userReview} 
                        onChangeHandler={inputChangeHandler}
                        />
                        

                    <button type='submit'>Add</button>
                    <button><Link to="/home" className="btn" id="cancelButton">Cancel</Link></button>

                    <div id="messages" className="alert alert-danger" role="alert"></div>
                </form> 
            </div>
    );
}

export default AddReview;