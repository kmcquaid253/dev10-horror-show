package horror.data;

import horror.models.AppUser;
import horror.models.Movie;
import horror.models.Watchlist;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

@SpringBootTest
public class WatchlistJdbcTemplateRepositoryTests {

    @Autowired
    ReviewJdbcRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup(){
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        throw new UnsupportedOperationException();
    }

    @Test
    void shouldAdd() {
        throw new UnsupportedOperationException();
    }

    @Test
    void shouldUpdate() {
        throw new UnsupportedOperationException();
    }

    @Test
    void shouldDelete() {
        throw new UnsupportedOperationException();
    }

    private Watchlist makeWatchlist() {
        LocalDate release = LocalDate.parse("2014-05-17");

        Movie movie = new Movie();
        movie.setTitle("It Follows");
        movie.setRuntime(100);
        movie.setRating("R");
        movie.setReleaseDate(release);
        movie.setScoreNum(10);
        movie.setDirectorId(1);
        movie.setSubgenreId(1);

        
        Watchlist watchlist = new Watchlist();
        watchlist.setMovie(movie);

        return watchlist;
    }
}
