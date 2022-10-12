package horror.data;

import horror.data.mappers.MovieMapper;
import horror.models.Movie;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
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
                    + "inner join director on director.directorId = movie.directorId "
                    + "inner join subgenre on subgenre.subgenreId = movie.subgenreId";

            return jdbcTemplate.query(sql, new MovieMapper());
        }

    @Override
    public Movie findById(int id) throws DataAccessException {
        final String sql = "select movieId, title, runtime, rating, releaseDate, scoreNum, director.directorId, subgenre.subgenreId "
        + "from movie "
        + "inner join director on director.directorId = movie.directorId "
        + "inner join subgenre on subgenre.subgenreId = movie.subgenreId "
        + "where movieId = ?";

        return jdbcTemplate.query(sql, new MovieMapper(), id).stream()
                .findFirst().orElse(null);
    }

    @Override
    public Movie create(Movie movie){
        final String sql = "insert into movie (title, runtime, rating, releaseDate, scoreNum, directorId, subgenreId) "
                + " values (?,?,?,?,?,?,?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, movie.getTitle());
            ps.setInt(2, movie.getRuntime());
            ps.setString(3, movie.getRating());
            ps.setDate(4, movie.getReleaseDate() == null ? null : Date.valueOf(movie.getReleaseDate()));
            ps.setInt(5, movie.getScoreNum());
            ps.setInt(6, movie.getDirectorId());
            ps.setInt(7, movie.getSubgenreId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        movie.setMovieId(keyHolder.getKey().intValue());
        return movie;
    }
}
