package horror.data;

import horror.data.mappers.FriendMapper;
import horror.models.Friend;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FriendJdbcRepository implements FriendRepository {

    private final JdbcTemplate jdbcTemplate;

    public FriendJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public List<Friend> findFriendsById(int id) throws DataAccessException {
        final String sql = "select appA.app_user_id as AId,\n" +
                "appB.app_user_id as BId,\n" +
                "appA.username as Auser,\n" +
                "appB.username as Buser\n" +
                "\n" +
                "from friend\n" +
                "inner join app_user as appA on friend.friendAId = appA.app_user_id \n" +
                "inner join app_user as appB on friend.friendBId = appB.app_user_id\n" +
                "where friendAId = ?\n" +
                "or friendBId = ?;";

        return jdbcTemplate.query(sql, new FriendMapper(), id, id);
    }
}
