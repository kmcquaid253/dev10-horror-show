package horror.data.mappers;

import horror.models.Movie;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MovieMapper implements RowMapper<Movie> {

    public Movie mapRow(ResultSet resultSet, int i) throws SQLException {
        Movie movie = new Movie();
        movie.setMovieId(resultSet.getInt("movieId"));
        movie.setTitle(resultSet.getString("title"));
        movie.setRuntime(resultSet.getString("runtime"));
        movie.setRating(resultSet.getString("rating"));
        if (resultSet.getDate("releaseDate") != null) {
            movie.setReleaseDate(resultSet.getDate("releaseDate").toLocalDate());
        }
        movie.setScoreNum(resultSet.getInt("scoreNum"));
        movie.setActorId(resultSet.getInt("actorId"));
        movie.setDirectorId(resultSet.getInt("directorId"));
        movie.setSubgenreId(resultSet.getInt("subgenreId"));
        return movie;
    }
}
