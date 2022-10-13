package horror.domain;

import horror.data.WatchlistRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
public class WatchlistServiceTests {

    @Autowired
    WatchlistService service;

    @MockBean
    WatchlistRepository repository;

    @Test
    void shouldAdd() {
        throw new UnsupportedOperationException();
    }

    @Test
    void shouldNotAddWhenInvalid() {
        throw new UnsupportedOperationException();
    }

    @Test
    void shouldUpdate() {
        throw new UnsupportedOperationException();
    }

    @Test
    void shouldNotUpdateWhenInvalid() {
        throw new UnsupportedOperationException();
    }
}
