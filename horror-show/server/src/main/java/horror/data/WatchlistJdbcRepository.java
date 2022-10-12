package horror.data;

import horror.models.Review;
import horror.models.Watchlist;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

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
        return null;
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
    public boolean update(Review watchlist) throws DataAccessException {
        return false;
    }

    @Override
    public boolean deleteById(int id) throws DataAccessException {
        return false;
    }
}
