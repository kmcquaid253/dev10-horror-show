package horror.controller;

import horror.domain.Result;
import horror.domain.WatchlistService;
import horror.models.AppUser;
import horror.models.Watchlist;
import horror.security.AppUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/watchlist")
public class WatchlistController {


    private final WatchlistService service;

    private final AppUserService appUserService;
    public WatchlistController(WatchlistService service, AppUserService appUserService) {
        this.service = service;
        this.appUserService = appUserService;
    }


    @GetMapping
    public List<Watchlist> findAll() {
        return service.findAll();
    }


    @GetMapping("/watchLater")
    public Watchlist findWatchLaterByUserId(@PathVariable int id) { return service.findWatchLaterById(id); }

    @GetMapping("/watched")
    public Watchlist findWatchedByUserId(@PathVariable int id) { return service.findWatchedById(id); }


    @PostMapping("/watchLater")
    public ResponseEntity<Object> createWatchLater(@RequestBody Watchlist watchlist) {
        AppUser appUser = (AppUser) appUserService.loadUserByUsername((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        watchlist.setAppUserId(appUser.getAppUserId());
        Result<Watchlist> result = service.createWatchLater(watchlist);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PostMapping("/watched")
    public ResponseEntity<Object> createWatched(@RequestBody Watchlist watchlist) {
        AppUser appUser = (AppUser) appUserService.loadUserByUsername((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        watchlist.setAppUserId(appUser.getAppUserId());
        Result<Watchlist> result = service.createWatched(watchlist);

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

        if (appUserId != watchlist.getAppUserId()) {
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
