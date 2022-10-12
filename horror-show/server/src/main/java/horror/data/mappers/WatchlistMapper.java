package horror.data.mappers;

import horror.models.Watchlist;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class WatchlistMapper implements RowMapper<Watchlist> {

    @Override
    public Watchlist mapRow(ResultSet resultSet, int i) throws SQLException {

        Watchlist watchlist = new Watchlist();

        MovieMapper movieMapper = new MovieMapper();
        watchlist.setMovie(movieMapper.mapRow(resultSet, i));

//        AppUserMapper appUserMapper = new AppUserMapper();
//        watchlist.setAppUser(appUserMapper.mapRow(resultSet, i));

        return watchlist;
    }
}
