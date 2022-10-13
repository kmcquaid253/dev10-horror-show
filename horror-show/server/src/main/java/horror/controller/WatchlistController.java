package horror.controller;

import horror.domain.WatchlistService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:8080"})
@RequestMapping("/api/watchlist")
public class WatchlistController {


    private final WatchlistService service;

    public WatchlistController(WatchlistService service) {
        this.service = service;
    }
}
