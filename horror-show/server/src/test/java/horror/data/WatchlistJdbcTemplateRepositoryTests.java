package horror.data;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

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
}
