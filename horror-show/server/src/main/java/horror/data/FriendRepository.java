package horror.data;

import horror.models.Friend;
import horror.models.Movie;
import org.springframework.dao.DataAccessException;

public interface FriendRepository {
    Friend findFriendById(int id) throws DataAccessException;
}
