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
        throw new UnsupportedOperationException();
    }

    public Movie findById(int movieId) {
        throw new UnsupportedOperationException();
    }
}
