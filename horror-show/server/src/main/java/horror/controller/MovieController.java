package horror.controller;

import horror.domain.MovieService;
import horror.models.Movie;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/movie")
public class MovieController {

private final MovieService service;

    public MovieController(MovieService service) {
        this.service = service;
    }


    @GetMapping
    public List<Movie> findAll() { return service.findAll(); }

    @GetMapping("/{agentId}")
    public Movie findById(@PathVariable int movieId) {
        return service.findById(movieId);
    }

}
