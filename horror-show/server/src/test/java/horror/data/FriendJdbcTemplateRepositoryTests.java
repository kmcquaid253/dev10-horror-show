package horror.data;

import horror.models.Friend;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

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
    void shouldFindAll() {
        List<Friend> friends = repository.findAll();
        assertNotNull(friends);

        assertTrue(friends.size() > 0);
    }


    @Test
    void shouldFindMovieOfId1() {
        Friend friend = repository.findFriendById(1);
        assertEquals(1, friend.getFriendAId());
        assertEquals(2, friend.getFriendBId());
        assertEquals("Gorp", friend.getName());
        assertEquals(1, friend.getAppUserId());
    }
}
