package horror.data;

import horror.models.Friend;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface FriendRepository {

    List<Friend> findFriendsById(int id) throws DataAccessException;
}
