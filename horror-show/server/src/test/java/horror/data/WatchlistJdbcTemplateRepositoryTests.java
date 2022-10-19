package horror.data;

import horror.models.AppUser;
import horror.models.Movie;
import horror.models.Watchlist;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class WatchlistJdbcTemplateRepositoryTests {

    @Autowired
    WatchlistRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup(){
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Watchlist> watchlist = repository.findAll();
        assertNotNull(watchlist);

        assertTrue(watchlist.size() > 0);
    }

    @Test
    void shouldAdd() {
        Watchlist watchlist = makeWatchlist();
        Watchlist actual = repository.create(watchlist);
        assertNotNull(actual);
    }

    @Test
    void shouldDelete() {
        assertTrue(repository.deleteById(11));
        assertFalse(repository.deleteById(11));
    }

    private Watchlist makeWatchlist() {
        LocalDate release = LocalDate.parse("2014-05-17");

        Movie movie = new Movie();
        movie.setId(11);
        movie.setTitle("It Follows");
        movie.setRuntime(100);
        movie.setRating("R");
        movie.setRelease_date(release);
        movie.setVote_average(10);
        movie.setDirectorId(1);
        movie.setSubgenreId(1);

        AppUser appUser = new AppUser(1, "kevin1234", "q1w2e3r4!", false, List.of("User"));

        Watchlist watchlist = new Watchlist();
        watchlist.setMovie(movie);
        watchlist.setAppUserId(appUser.getAppUserId());

        return watchlist;
    }
}
