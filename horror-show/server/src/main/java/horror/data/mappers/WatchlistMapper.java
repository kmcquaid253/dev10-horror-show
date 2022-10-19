package horror.data.mappers;

import horror.models.Review;
import horror.models.Watchlist;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class WatchlistMapper implements RowMapper<Watchlist> {
    private final List<String> roles;

    public WatchlistMapper(List<String> roles) {
        this.roles = roles;
    }


    @Override
    public Watchlist mapRow(ResultSet resultSet, int i) throws SQLException {

        Watchlist watchlist = new Watchlist();

        MovieMapper movieMapper = new MovieMapper();
        watchlist.setMovie(movieMapper.mapRow(resultSet, i));
        watchlist.setWatchlistId(resultSet.getInt("watchlistId"));
        watchlist.setAppUserId(resultSet.getInt("app_user_id"));
        watchlist.setMovieId(resultSet.getInt("movieId"));
        watchlist.setWatched(resultSet.getBoolean("watched"));
        watchlist.setWatchLater(resultSet.getBoolean("watchLater"));
        return watchlist;
    }
}
