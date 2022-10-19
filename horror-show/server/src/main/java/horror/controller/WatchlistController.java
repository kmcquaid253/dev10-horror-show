package horror.controller;

import horror.domain.Result;
import horror.domain.WatchlistService;
import horror.models.AppUser;
import horror.models.WatchlistItem;
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
    public List<WatchlistItem> findAll() {
        return service.findAll();
    }

//    @PostMapping
//    public ResponseEntity<Object> create(@RequestBody WatchlistItem watchlistItem) {
//        AppUser appUser = (AppUser) appUserService.loadUserByUsername((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
//        watchlistItem.setAppUserId(appUser.getAppUserId());
//        Result<WatchlistItem> result = service.create(watchlistItem);
//        if (result.isSuccess()) {
//            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
//        }
//        return ErrorResponse.build(result);
//    }

    @PutMapping
    public ResponseEntity<Object> update(@RequestBody List<WatchlistItem> watchlist) {
        AppUser appUser = (AppUser) appUserService.loadUserByUsername((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());

        Result result = service.update(watchlist, appUser.getAppUserId());
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/api/watchlist")
    public ResponseEntity<Void> deleteById(@PathVariable int movieId) {
        if (service.deleteById(movieId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
