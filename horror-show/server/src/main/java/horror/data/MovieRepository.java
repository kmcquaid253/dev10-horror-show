package horror.data;

import horror.models.Movie;
import org.springframework.dao.DataAccessException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MovieRepository {
    List<Movie> findAll() throws DataAccessException;
    Movie findById(int id) throws DataAccessException;

    Movie create(Movie movie);

    boolean update(Movie movie);

    @Transactional
    boolean deleteById(int movieId);
}
