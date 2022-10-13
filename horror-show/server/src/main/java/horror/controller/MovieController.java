package horror.controller;

import horror.domain.MovieService;
import horror.domain.Result;
import horror.models.Movie;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{movieId}")
    public Movie findById(@PathVariable int movieId) {
        return service.findById(movieId);
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody Movie movie) {
        Result<Movie> result = service.create(movie);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{movieId}")
    public ResponseEntity<Object> update(@PathVariable int movieId, @RequestBody Movie movie) {
        if (movieId != movie.getMovieId()) {
            return  new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Movie> result = service.update(movie);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{movieId}")
    public ResponseEntity<Void> deleteById(@PathVariable int movieId) {
        if (service.deleteById(movieId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
