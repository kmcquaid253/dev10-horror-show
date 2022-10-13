package horror.domain;

import horror.data.MovieRepository;
import horror.models.Movie;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    private final MovieRepository repository;

    public MovieService(MovieRepository repository) {
        this.repository = repository;
    }


    public List<Movie> findAll() {
        return repository.findAll();
    }

    public Movie findById(int movieId) {
        throw new UnsupportedOperationException();
    }

    public Result<Movie> create(Movie movie) {
        Result<Movie> result = validate(movie);
        if (!result.isSuccess()) {
            return result;
        }

        if (movie.getMovieId() != 0) {
            result.addMessage("movieId cannot be set for 'create' operation.", ResultType.INVALID);
            return result;
        }

        movie = repository.create(movie);
        result.setPayload(movie);
        return result;
    }

    public Result<Movie> update(Movie movie) {
        Result<Movie> result = validate(movie);
        if (!result.isSuccess()) {
            return result;
        }
        
        if (movie.getMovieId() <= 0) {
            result.addMessage("MovieId must be set for 'update' operation", ResultType.INVALID);
            return result;
        }
        
        if (!repository.update(movie)) {
            String msg = String.format("MovieId: %s not found.", movie.getMovieId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(int movieId) {
        return repository.deleteById(movieId);
    }

    private Result<Movie> validate(Movie movie) {
        Result<Movie> result = new Result<>();
        if (movie == null) {
            result.addMessage("Movie cannot be null", ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(movie.getTitle())) {
            result.addMessage("Movie title cannot be blank.", ResultType.INVALID);
            return result;
        }

        return result;
    }
}
