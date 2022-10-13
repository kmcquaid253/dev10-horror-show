package horror.data;

import horror.models.Friend;
import horror.models.Movie;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface FriendRepository {
    List<Friend> findAll();

    Friend findFriendById(int id) throws DataAccessException;
}
