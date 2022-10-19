package horror.domain;

import horror.data.FriendRepository;
import horror.models.AppUser;
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
    void shouldFindById() {
    }

    Friend makeFriend() {
        AppUser appUser1 = new AppUser(1, "kevin1234", "password",
                false, List.of("USER"));

        AppUser appUser2 = new AppUser(2, "martin789", "good-password",
                false, List.of("USER"));

        Friend friend = new Friend();
        friend.setUserA(appUser1);
        friend.setUserB(appUser2);
        return friend;
    }
}
