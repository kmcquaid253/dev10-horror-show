package horror.data;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class FriendJdbcTemplateRepositoryTests {

    @Autowired
    FriendJdbcRepository repository;

    @Autowired
    KnownGoodState knownGoodState; //sql database kgs needs info

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }


    @Test
    void shouldFindFriendOfId1() {
        throw new UnsupportedOperationException();
    }
}
