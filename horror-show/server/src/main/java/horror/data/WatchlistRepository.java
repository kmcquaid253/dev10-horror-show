package horror.data;

import horror.models.Review;
import horror.models.Watchlist;
import org.springframework.dao.DataAccessException;

import java.util.List;


// bridge table in database, subject to change

public interface WatchlistRepository {

    List<Watchlist> findAll() throws DataAccessException;

    Watchlist createWatchLater(Watchlist watchlist) throws DataAccessException;

    Watchlist createWatched(Watchlist watchlist) throws DataAccessException;

    boolean update(Watchlist watchlist) throws DataAccessException;

    boolean deleteById(int id) throws DataAccessException;

    Watchlist findWatchLaterById(int id);

    Watchlist findWatchedById(int id);
}
