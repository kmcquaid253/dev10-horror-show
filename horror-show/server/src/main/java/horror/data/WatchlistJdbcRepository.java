package horror.data;

import horror.data.mappers.WatchlistMapper;
import horror.models.WatchlistItem;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class WatchlistJdbcRepository implements WatchlistRepository{

    private final JdbcTemplate jdbcTemplate;

    private final List<String> roles;

    public WatchlistJdbcRepository(JdbcTemplate jdbcTemplate, List<String> roles) {
        this.jdbcTemplate = jdbcTemplate;
        this.roles = roles;
    }


    @Override
    public List<WatchlistItem> findAll(int appUserId) throws DataAccessException {
        final String sql = "select movie.movieId, app_user.app_user_id, app_user.username, app_user.password_hash, "
                + "app_user.disabled, movie.title, movie.runtime, movie.rating, "
                + "movie.releaseDate, movie.scoreNum, movie.directorId, movie.subgenreId, movie.poster_path, title, "
                + "watchLater, watched "
                + "from watchlist_movie "
                + "inner join movie on movie.movieId = watchlist_movie.movieId "
                + "inner join app_user on app_user.app_user_id = watchlist_movie.app_user_id "
                + "where app_user.app_user_id = ?";

        return jdbcTemplate.query(sql, new WatchlistMapper(roles), appUserId);
    }

    @Override
    public WatchlistItem create(WatchlistItem watchlistItem) throws DataAccessException {

        final String sql = "insert into watchlist_movie (movieId, app_user_id, watched, watchLater) "
                + " values (?,?,?,?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, watchlistItem.getMovie().getId());
            ps.setInt(2, watchlistItem.getAppUserId());
            ps.setBoolean(3, watchlistItem.isWatched());
            ps.setBoolean(4, watchlistItem.isWatchLater());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }
        return watchlistItem;
    }

    @Override
    @Transactional
    public boolean update(List<WatchlistItem> watchlist, int appUserId) throws DataAccessException {

        jdbcTemplate.update("delete from watchlist_movie where app_user_id = ?;", appUserId);

        for (WatchlistItem watchlistItem : watchlist) {
            final String sql = "insert into watchlist_movie (movieId, app_user_id, watched, watchLater) "
                    + " values (?,?,?,?)";

            jdbcTemplate.update(sql,watchlistItem.getMovie().getId(), appUserId,
                    watchlistItem.isWatched(),watchlistItem.isWatchLater());
        }

        return true;
    }

    @Override
    @Transactional
    public boolean deleteById(int id) throws DataAccessException {
        return jdbcTemplate.update("delete from watchlist_movie where movieId = ?", id) > 0;
    }
}
