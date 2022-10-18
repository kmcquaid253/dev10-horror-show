package horror.data.mappers;

import horror.models.Review;
import horror.models.Watchlist;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class WatchlistMapper implements RowMapper<Watchlist> {

    @Override
    public Watchlist mapRow(ResultSet resultSet, int i) throws SQLException {

        Watchlist watchlist = new Watchlist();

        MovieMapper movieMapper = new MovieMapper();
        watchlist.setMovie(movieMapper.mapRow(resultSet, i));
        watchlist.setAppUserId(resultSet.getInt("app_user_id"));
        watchlist.setWatchLater(resultSet.getBoolean("watchLater"));
        watchlist.setWatched(resultSet.getBoolean("watched"));
        return watchlist;
    }
}
