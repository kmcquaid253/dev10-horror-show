package horror.domain;

import horror.data.MovieRepository;
import horror.models.Movie;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;

import static org.mockito.Mockito.when;

@SpringBootTest
public class MovieServiceTests {

    @Autowired
    MovieService service;

    @MockBean
    MovieRepository repository;

    @Test
    void shouldCreate(){
        Movie movie = makeMovie();
        Movie mockOut = makeMovie();
        mockOut.setMovieId(1);

        when(repository.create(movie)).thenReturn(mockOut);

        Result<Movie> actual = service.create(movie);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotCreateWhenInvalid(){
        Movie movie = makeMovie();
        movie.setTitle("  ");

        Result<Movie> actual = service.create(movie);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldUpdate(){
        Movie movie = makeMovie();
        movie.setMovieId(1);

        when(repository.update(movie)).thenReturn(true);

        Result<Movie> actual = service.update(movie);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateWhenInvalid() {
        Movie movie = makeMovie();
        Result<Movie> actual = service.update(movie);
        assertEquals(ResultType.INVALID, actual.getType());

        movie = makeMovie();
        movie.setMovieId(1);
        movie.setTitle("");
        actual = service.update(movie);
        assertEquals(ResultType.INVALID, actual.getType());

        movie = makeMovie();
        movie.setMovieId(1);
        movie.setTitle(null);
        actual = service.update(movie);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    Movie makeMovie() {
        LocalDate release = LocalDate.parse("2018-06-08");

        Movie movie = new Movie();
        movie.setTitle("Hereditary");
        movie.setRuntime(127);
        movie.setRating("R");
        movie.setReleaseDate(release);
        movie.setScoreNum(10);
        movie.setDirectorId(1);
        movie.setSubgenreId(1);
        return movie;
    }
}
