package horror.domain;

import horror.data.FriendRepository;
import horror.models.Friend;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

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
        Friend expected = makeFriend();
        when(repository.findFriendById(1)).thenReturn(expected);
        Friend actual = service.findById(1);
        assertEquals(expected, actual);
    }

    Friend makeFriend() {
        Friend friend = new Friend();
        friend.setFriendAId(1);
        friend.setFriendBId(1);
        friend.setName("Bob");
        friend.setAppUserId(1);
        return friend;
    }
}
