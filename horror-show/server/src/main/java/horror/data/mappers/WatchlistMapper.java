package horror.data.mappers;

import horror.models.Movie;
import horror.models.WatchlistItem;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class WatchlistMapper implements RowMapper<WatchlistItem> {
    private final List<String> roles;

    public WatchlistMapper(List<String> roles) {
        this.roles = roles;
    }


    @Override
    public WatchlistItem mapRow(ResultSet resultSet, int i) throws SQLException {

        WatchlistItem watchlistItem = new WatchlistItem();
        Movie movie = new Movie();
        movie.setId(resultSet.getInt("movieId"));

        MovieMapper movieMapper = new MovieMapper();
        watchlistItem.setMovie(movieMapper.mapRow(resultSet, i));
        watchlistItem.setAppUserId(resultSet.getInt("app_user_id"));
        watchlistItem.setMovie(movie);
        watchlistItem.setWatched(resultSet.getBoolean("watched"));
        watchlistItem.setWatchLater(resultSet.getBoolean("watchLater"));
        return watchlistItem;
    }
}
