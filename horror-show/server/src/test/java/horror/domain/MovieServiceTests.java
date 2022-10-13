package horror.domain;

import horror.data.MovieRepository;
import horror.models.Movie;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;

@SpringBootTest
public class MovieServiceTests {

    @Autowired
    MovieService service;

    @MockBean
    MovieRepository repository;

    @Test
    void shouldCreate(){
        throw new UnsupportedOperationException();
    }

    @Test
    void shouldNotCreateWhenInvalid(){
        throw new UnsupportedOperationException();
    }

    @Test
    void shouldUpdate(){
        throw new UnsupportedOperationException();
    }

    @Test
    void shouldNotUpdateWhenInvalid() {
        throw new UnsupportedOperationException();
    }

    @Test
    void shouldDelete(){
        throw new UnsupportedOperationException();
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
