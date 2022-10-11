package horror.data;

import horror.data.mappers.MovieMapper;
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

            final String sql = "select movieId, title, runtime, rating, releaseDate, scoreNum, director.directorId, subgenre.subgenreId "
                    + "from movie "
                    + "inner join director on director.directorId = movie.directorId"
                    + "inner join subgenre on subgenre.subgenreId = movie.subgenreId";

            return jdbcTemplate.query(sql, new MovieMapper());
        }

    @Override
    public Movie findById(int id) throws DataAccessException {
        final String sql = "select movieId, title, runtime, rating, releaseDate, scoreNum, actorId, director.directorId, subgenre.subgenreId "
        + "from movie "
        + "inner join director on director.directorId = movie.directorId"
        + "inner join subgenre on subgenre.subgenreId = movie.subgenreId"
        + "where movieId = '1'";

        return jdbcTemplate.query(sql, new MovieMapper(), id).stream()
                .findFirst().orElse(null);
    }
}
