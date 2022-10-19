package horror.domain;

import horror.data.FriendRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
public class FriendServiceTests {

    @Autowired
    FriendService service;

    @MockBean
    FriendRepository repository;

    @Test
    void shouldFindById() {
        throw new UnsupportedOperationException();
    }
}
