package horror.data;

import horror.data.mappers.MovieMapper;
import horror.models.Movie;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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

            final String sql = "select movieId, title, runtime, rating, releaseDate, scoreNum, director.directorId, subgenre.subgenreId, poster_path "
                    + "from movie "
                    + "inner join director on director.directorId = movie.directorId "
                    + "inner join subgenre on subgenre.subgenreId = movie.subgenreId";

            return jdbcTemplate.query(sql, new MovieMapper());
        }

    @Override
    public Movie findById(int id) throws DataAccessException {
        final String sql = "select movieId, title, runtime, rating, poster_path, releaseDate, scoreNum, d.directorId, s.subgenreId, d.firstName, d.lastName, d.nationality, s.name " +
                "from movie " +
                "left outer join director d on d.directorId = movie.directorId " +
                "left outer join subgenre s on s.subgenreId = movie.subgenreId " +
                "where movieId = ?;";

        return jdbcTemplate.query(sql, new MovieMapper(), id).stream()
                .findFirst().orElse(null);
    }



    @Override
    public Movie create(Movie movie){
        final String sql = "insert into movie (movieId, title, runtime, rating, poster_path, releaseDate, scoreNum) "
                + " values (?,?,?,?,?,?,?)";

        int rowsAffected = jdbcTemplate.update(sql,
            movie.getId(),
            movie.getTitle(),
            movie.getRuntime(),
            movie.getRating(),
            movie.getPoster_path(),
            movie.getRelease_date() == null ? null : Date.valueOf(movie.getRelease_date()),
            movie.getVote_average());

        if (rowsAffected <= 0) {
            return null;
        }

        return movie;
    }

    @Override
    public boolean update(Movie movie) {

        final String sql = "update movie set "
                + "title = ?, "
                + "runtime = ?, "
                + "rating = ?, "
                + "poster_path = ?,"
                + "releaseDate = ?, "
                + "scoreNum = ?, "
                + "directorId = ?, "
                + "subgenreId = ? "
                + "where movieId = ?";

        return jdbcTemplate.update(sql,
                movie.getTitle(),
                movie.getRuntime(),
                movie.getRating(),
                movie.getPoster_path(),
                movie.getRelease_date(),
                movie.getVote_average(),
                movie.getDirectorId(),
                movie.getSubgenreId(),
                movie.getId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int movieId) {
        return jdbcTemplate.update("delete from movie where movieId = ?", movieId) > 0;
    }

    @Override
    public void addOrUpdate(Movie movie) {
        if (jdbcTemplate.queryForObject("select count(*) from movie where movieId = ?",
                (rs,i) -> rs.getInt(1), movie.getId()) < 1){
            create(movie);
        }

    }
}
