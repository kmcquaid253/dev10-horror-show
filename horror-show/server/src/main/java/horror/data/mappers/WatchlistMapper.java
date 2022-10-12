package horror.data.mappers;

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

        AppUserMapper appUserMapper = new AppUserMapper(roles);
        watchlist.setAppUser(appUserMapper.mapRow(resultSet, i));

        return watchlist;
    }
}
