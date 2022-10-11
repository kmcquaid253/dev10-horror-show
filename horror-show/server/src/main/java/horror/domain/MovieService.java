package horror.domain;

import horror.models.Movie;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    public List<Movie> findAll() {
        throw new UnsupportedOperationException();
    }

    public Movie findById(int movieId) {
        throw new UnsupportedOperationException();
    }
}
