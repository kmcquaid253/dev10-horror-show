package horror.data;


import horror.models.Movie;
import horror.models.Subgenre;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class SubgenreJdbcTemplateRepositoryTests {

    @Autowired
    SubgenreJdbcRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }


    @Test
    void shouldFindAll() {
        List<Subgenre> actors = repository.findAll();
        assertNotNull(actors);
        assertTrue(actors.size() >= 2);
    }


    @Test
    void shouldFindHorrorSubgenre() {
        Subgenre subgenre = repository.findSubgenreById(1);
        assertEquals(1, subgenre.getSubgenreId());
        assertEquals("Horror", subgenre.getName());
    }

    @Test
    void shouldFindThrillerSubgenre() {
        makeMovie();
        Subgenre subgenre = repository.findSubgenreById(2);
        assertEquals(2, subgenre.getSubgenreId());
        assertEquals("Thriller", subgenre.getName());
    }

    private Movie makeMovie() {
        LocalDate release = LocalDate.parse("2014-05-17");

        Movie movie = new Movie();
        movie.setTitle("It Follows");
        movie.setRuntime(100);
        movie.setRating("R");
        movie.setRelease_date(release);
        movie.setVote_average(10);
        movie.setDirectorId(1);
        movie.setSubgenreId(1);
        return movie;
    }
}
