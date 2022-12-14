package horror.data;

import horror.models.Movie;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class MovieJdbcTemplateRepositoryTests {

    @Autowired
    MovieJdbcRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }


    @Test
    void shouldFindAll() {
        List<Movie> movies = repository.findAll();
        assertNotNull(movies);

        assertTrue(movies.size() > 0);
    }


    @Test
    void shouldFindMovieOfId1() {

        LocalDate release = LocalDate.parse("1976-11-03");

        Movie movie = repository.findById(1);
        assertEquals(1, movie.getId());
        assertEquals("Carrie", movie.getTitle());
        assertEquals(98, movie.getRuntime());
        assertEquals("R", movie.getRating());
        assertEquals(release, movie.getRelease_date());
        assertEquals(10, movie.getVote_average());
    }

    @Test
    void shouldCreate() {
        Movie movie = makeMovie();
        Movie actual = repository.create(movie);
        assertNotNull(actual);
    }

    @Test
    void shouldUpdate() {
        Movie movie = makeMovie();
        movie.setRuntime(99);
        assertTrue(repository.update(movie));
    }

    @Test
    void willDelete() {
        assertTrue(repository.deleteById(3));
        assertFalse(repository.deleteById(3));
    }

    private Movie makeMovie() {
        LocalDate release = LocalDate.parse("2014-05-17");

        Movie movie = new Movie();
        movie.setTitle("It Follows");
        movie.setRuntime(100);
        movie.setRating("R");
        movie.setPoster_path("Poster path");
        movie.setRelease_date(release);
        movie.setVote_average(10);
        movie.setDirectorId(1);
        movie.setSubgenreId(1);
        return movie;
    }
}
