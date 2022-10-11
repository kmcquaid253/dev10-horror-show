package horror.data;

import horror.models.Movie;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MovieJdbcRepository implements MovieRepository {

    private final JdbcTemplate jdbcTemplate;

    public MovieJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Movie> findAll() {
        throw new UnsupportedOperationException();
    }
}
