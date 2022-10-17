package horror.domain;

import horror.data.FriendRepository;
import horror.models.Friend;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class FriendServiceTests {

    @Autowired
    FriendService service;

    @MockBean
    FriendRepository repository;

    @Test
    void shouldFindBob() {
        throw new UnsupportedOperationException();
    }
}
