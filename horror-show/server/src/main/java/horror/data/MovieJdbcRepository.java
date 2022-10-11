package horror.data;

import horror.models.Movie;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MovieJdbcRepository implements MovieRepository {

    private final JdbcTemplate jdbcTemplate;

    public MovieJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    @Override
    public List<Movie> findAll() {
        throw new UnsupportedOperationException();
    }

    @Override
    public Movie findById(int id) throws DataAccessException {
        throw new UnsupportedOperationException();
    }
}
