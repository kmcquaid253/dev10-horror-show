package horror.data;

import horror.models.Review;
import horror.models.Watchlist;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class WatchlistJdbcRepository implements WatchlistRepository{
    @Override
    public List<Watchlist> findAll() throws DataAccessException {
        return null;
    }

    @Override
    public Watchlist create(Watchlist watchlist) throws DataAccessException {
        return null;
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
