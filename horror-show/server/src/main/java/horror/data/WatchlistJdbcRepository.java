package horror.data;

import horror.models.Watchlist;
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

    public WatchlistJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Watchlist> findAll() throws DataAccessException {
        final String sql = "select movie.movieId, app_user.app_user_id "
                + "from watchlist_movie "
                + "inner join movie on movie.movieId = watchlist_movie.movieId "
                + "inner join app_user on app_user.app_user_id = watchlist_movie.app_user_id";

        //TODO figure out watchlist mapper input
        throw new UnsupportedOperationException();
//        return jdbcTemplate.query(sql, new WatchlistMapper());
    }

    @Override
    public Watchlist create(Watchlist watchlist) throws DataAccessException {

        final String sql = "insert into watchlist_movie (movieId, app_user_id) values "
                + "(?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, watchlist.getMovie().getMovieId());
            ps.setInt(2, watchlist.getAppUser().getAppUserId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }
        return watchlist;
    }

    @Override
    public boolean update(Watchlist watchlist) throws DataAccessException {

        final String sql = "update watchlist_movie set "
                + "where movieId = ?, "
                + "where app_user_id = ?";

        return jdbcTemplate.update(sql,
                watchlist.getMovie().getMovieId() > 0,
                watchlist.getAppUser().getAppUserId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int id) throws DataAccessException {
        return jdbcTemplate.update("delete from watchlist_movie where movieId = ?", id) > 0;
    }
}
