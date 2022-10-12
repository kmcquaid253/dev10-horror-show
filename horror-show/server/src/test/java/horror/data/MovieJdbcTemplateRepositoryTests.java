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
        assertEquals(1, movie.getMovieId());
        assertEquals("Carrie", movie.getTitle());
        assertEquals(98, movie.getRuntime());
        assertEquals("R", movie.getRating());
        assertEquals(release, movie.getReleaseDate());
        assertEquals(10, movie.getScoreNum());
        assertEquals(1, movie.getDirectorId());
        assertEquals(1, movie.getSubgenreId());
    }
}
