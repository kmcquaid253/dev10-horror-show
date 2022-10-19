package horror.data;

import horror.models.AppUser;
import horror.models.Friend;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class FriendJdbcTemplateRepositoryTests {

    @Autowired
    FriendJdbcRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }


    @Test
    void shouldFindFriendship() {
        AppUser appUser1 = new AppUser(1, "kevin1234", "password",
                false, List.of("USER"));

        AppUser appUser2 = new AppUser(2, "martin789", "good-password",
                false, List.of("USER"));

        Friend friend = new Friend();
        friend.setUserA(appUser1);
        friend.setUserB(appUser2);

        assertEquals(1, appUser1.getAppUserId());
        assertEquals(2, appUser2.getAppUserId());
        assertEquals(1, friend.getUserA().getAppUserId());
        assertEquals(2, friend.getUserB().getAppUserId());
    }
}
