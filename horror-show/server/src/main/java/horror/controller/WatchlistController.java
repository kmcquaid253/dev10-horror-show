package horror.controller;

import horror.domain.Result;
import horror.domain.WatchlistService;
import horror.models.Watchlist;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:8080"})
@RequestMapping("/api/watchlist")
public class WatchlistController {


    private final WatchlistService service;

    public WatchlistController(WatchlistService service) {
        this.service = service;
    }

    @GetMapping
    public List<Watchlist> findAll() {
        return service.findAll();
    }

    @PostMapping("/watchLater")
    public ResponseEntity<Object> createWatchLater(@RequestBody Watchlist watchlist) {
        Result<Watchlist> result = service.createWatchLater(watchlist);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PostMapping("/watched")
    public ResponseEntity<Object> createWatched(@RequestBody Watchlist watchlist) {
        Result<Watchlist> result = service.createWatchLater(watchlist);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping
    public ResponseEntity<Object> update(@PathVariable int movieId, @PathVariable int appUserId, @RequestBody Watchlist watchlist) {
        if (movieId != watchlist.getMovie().getId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        if (appUserId != watchlist.getAppUser().getAppUserId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Watchlist> result = service.update(watchlist);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteById(@PathVariable int movieId) {
        if (service.deleteById(movieId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
