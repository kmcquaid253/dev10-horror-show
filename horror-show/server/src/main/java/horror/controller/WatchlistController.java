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

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody Watchlist watchlist) {
        Result<Watchlist> result = service.create(watchlist);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }
}
