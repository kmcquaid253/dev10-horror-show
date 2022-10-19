package horror.data;

import horror.models.WatchlistItem;
import org.springframework.dao.DataAccessException;

import java.util.List;


// bridge table in database, subject to change

public interface WatchlistRepository {

    List<WatchlistItem> findAll() throws DataAccessException;
    WatchlistItem create(WatchlistItem watchlistItem) throws DataAccessException;


    boolean update(List<WatchlistItem> watchlist, int appUserId) throws DataAccessException;

    boolean deleteById(int id) throws DataAccessException;
}
