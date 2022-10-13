package horror.domain;

import horror.data.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
public class WatchlistServiceTests {

    @Autowired
    WatchlistService service;

    @MockBean
    WatchlistRepository repository;
}
