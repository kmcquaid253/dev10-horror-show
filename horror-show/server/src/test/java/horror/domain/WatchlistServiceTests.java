package horror.domain;

import horror.data.WatchlistRepository;
import horror.models.AppUser;
import horror.models.Movie;
import horror.models.Watchlist;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

@SpringBootTest
public class WatchlistServiceTests {

    @Autowired
    WatchlistService service;

    @MockBean
    WatchlistRepository repository;

    @Test
    void shouldAdd() {
        Watchlist watchlist = makeWatchlist();
        Watchlist mockOut = makeWatchlist();

        when(repository.create(watchlist)).thenReturn(mockOut);

        Result<Watchlist> actual = service.create(watchlist);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotAddWhenInvalid() {
        Watchlist watchlist = makeWatchlistWithNullMovieId();

        Result<Watchlist> actual = service.create(watchlist);
        assertNull(actual.getPayload());
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
        watchlist.setAppUser(appUser);

        return watchlist;
    }

    private Watchlist makeWatchlistWithNullMovieId() {
        LocalDate release = LocalDate.parse("2014-05-17");

        Movie movie = new Movie();
        movie.setId(0);
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
        watchlist.setAppUser(appUser);

        return watchlist;
    }
}
