package horror.domain;

import horror.data.MovieRepository;
import horror.data.WatchlistRepository;
import horror.models.WatchlistItem;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchlistService {

    private final WatchlistRepository repository;

    private final MovieRepository movieRepository;

    public WatchlistService(WatchlistRepository repository, MovieRepository movieRepository) {
        this.repository = repository;
        this.movieRepository = movieRepository;
    }

    public List<WatchlistItem> findAll(int appUserId) {
        return repository.findAll(appUserId);
    }

//    public Result<WatchlistItem> create(WatchlistItem watchlistItem){
//        Result<WatchlistItem> result = validate(watchlistItem);
//        if (!result.isSuccess()) {
//            return result;
//        }
//
//        watchlistItem = repository.create(watchlistItem);
//        result.setPayload(watchlistItem);
//        return result;
//    }

    public Result update(List<WatchlistItem> watchlist, int appUserId) {
        for (WatchlistItem watchlistItem : watchlist) {
            movieRepository.addOrUpdate(watchlistItem.getMovie());
            watchlistItem.setAppUserId(appUserId);
        }

        Result<WatchlistItem> result = validate(watchlist);
        if (!result.isSuccess()) {
            return result;
        }


        repository.update(watchlist, appUserId);
        return result;
    }

    public boolean deleteById(int movieId) {
        return repository.deleteById(movieId);
    }

    private Result<WatchlistItem> validate(List<WatchlistItem> watchlist){
        Result<WatchlistItem> result = new Result<>();

        for (WatchlistItem watchlistItem : watchlist) {
            if (watchlistItem == null) {
                result.addMessage("Watchlist cannot be null", ResultType.INVALID);
                return result;
            }

            if (watchlistItem.getMovie().getId() < 0) {
                result.addMessage("Invalid film selected.", ResultType.INVALID);
                return result;
            }

            if (watchlistItem.getAppUserId() == 0) {
                result.addMessage("Invalid user ID", ResultType.INVALID);
                return result;
            }
        }

        return result;
    }
}
