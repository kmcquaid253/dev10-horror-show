package horror.domain;

import horror.data.WatchlistRepository;
import horror.models.AppUser;
import horror.models.Movie;
import horror.models.WatchlistItem;
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
public class WatchlistItemServiceTests {

    @Autowired
    WatchlistService service;

    @MockBean
    WatchlistRepository repository;

//    @Test
//    void shouldAdd() {
//        WatchlistItem watchlistItem = makeWatchlist();
//        WatchlistItem mockOut = makeWatchlist();
//
//        when(repository.create(watchlistItem)).thenReturn(mockOut);
//
//        Result<WatchlistItem> actual = service.create(watchlistItem);
//        assertEquals(ResultType.SUCCESS, actual.getType());
//        assertEquals(mockOut, actual.getPayload());
//    }

//    @Test
//    void shouldNotAddWhenInvalid() {
//        WatchlistItem watchlistItem = makeWatchlistWithNullMovieId();
//
//        Result<WatchlistItem> actual = service.create(watchlistItem);
//        assertNull(actual.getPayload());
//    }

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

    private WatchlistItem makeWatchlistWithNullMovieId() {
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

        WatchlistItem watchlistItem = new WatchlistItem();
        watchlistItem.setMovie(movie);
        watchlistItem.setAppUserId(appUser.getAppUserId());

        return watchlistItem;
    }
}
