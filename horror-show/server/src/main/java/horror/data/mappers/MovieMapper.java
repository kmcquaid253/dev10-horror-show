package horror.data.mappers;

import horror.models.Movie;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MovieMapper implements RowMapper<Movie> {

    public Movie mapRow(ResultSet resultSet, int i) throws SQLException {
        Movie movie = new Movie();
        movie.setId(resultSet.getInt("movieId"));
        movie.setTitle(resultSet.getString("title"));
        movie.setRuntime(resultSet.getInt("runtime"));
        movie.setRating(resultSet.getString("rating"));
        if (resultSet.getDate("releaseDate") != null) {
            movie.setRelease_date(resultSet.getDate("releaseDate").toLocalDate());
        }
        movie.setVote_average(resultSet.getInt("scoreNum"));
        movie.setPoster_path(resultSet.getString("poster_path"));
        movie.setDirectorId(resultSet.getInt("directorId"));
        movie.setSubgenreId(resultSet.getInt("subgenreId"));
        return movie;
    }
}
