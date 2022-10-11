package horror.data;

import horror.models.Movie;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class MovieJdbcRepositoryTests {

    @Autowired
    MovieJdbcRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }


    // have not hard - coded test data yet
    @Test
    void shouldFindAll() {
        List<Movie> movies = repository.findAll();
        assertNotNull(movies);

        assertTrue(movies.size() >= 4);
    }


    @Test
    void shouldFindMovieOfId1() {
        Movie movie = repository.findById(1);
        assertEquals(1, movie.getMovieId());
        assertEquals("Title", movie.getTitle());
        assertEquals("Runtime", movie.getRuntime());
        assertEquals("Rating", movie.getRating());
        assertEquals(01-01-2000, movie.getReleaseDate());
        assertEquals(10, movie.getScoreNum());
        assertEquals(1, movie.getDirectorId());
        assertEquals(1, movie.getSubgenreId());
    }
}
