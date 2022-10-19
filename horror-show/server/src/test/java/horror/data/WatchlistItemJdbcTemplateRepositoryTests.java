package horror.data;

import horror.models.AppUser;
import horror.models.Movie;
import horror.models.WatchlistItem;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class WatchlistItemJdbcTemplateRepositoryTests {

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
        List<WatchlistItem> watchlistItem = repository.findAll();
        assertNotNull(watchlistItem);

        assertTrue(watchlistItem.size() > 0);
    }

    @Test
    void shouldAdd() {
        WatchlistItem watchlistItem = makeWatchlist();
        WatchlistItem actual = repository.create(watchlistItem);
        assertNotNull(actual);
    }

    @Test
    void willDelete() {
        assertTrue(repository.deleteById(11));
        assertFalse(repository.deleteById(11));
    }

    private WatchlistItem makeWatchlist() {
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

        WatchlistItem watchlistItem = new WatchlistItem();
        watchlistItem.setMovie(movie);
        watchlistItem.setAppUserId(appUser.getAppUserId());
       

        return watchlistItem;
    }
}
