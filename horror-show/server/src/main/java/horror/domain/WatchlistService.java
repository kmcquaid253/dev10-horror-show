package horror.domain;

import horror.data.WatchlistRepository;
import horror.models.Watchlist;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchlistService {

    private final WatchlistRepository repository;

    public WatchlistService(WatchlistRepository repository) {
        this.repository = repository;
    }

    public List<Watchlist> findAll() {
        return repository.findAll();
    }

    public Result<Watchlist> create(Watchlist watchlist){
        throw new UnsupportedOperationException();
    }

    public Result<Watchlist> update() {
        throw new UnsupportedOperationException();
    }

    public boolean deleteById(int movieId) {
        return repository.deleteById(movieId);
    }

    private Result<Watchlist> validate(Watchlist watchlist){
        Result<Watchlist> result = new Result<>();
        //TODO Possibly come back to later. Can a Watchlist be null?
        if (watchlist == null) {
            result.addMessage("Watchlist cannot be null", ResultType.INVALID);
            return result;
        }

        if (watchlist.getMovie().getMovieId() == 0){
            result.addMessage("Invalid film selected.", ResultType.INVALID);
            return result;
        }

        if (watchlist.getAppUser().getAppUserId() == 0){
            result.addMessage("Invalid user ID", ResultType.INVALID);
            return result;
        }

        return result;
    }
}
