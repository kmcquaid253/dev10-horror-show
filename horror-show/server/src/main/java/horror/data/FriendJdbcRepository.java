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
    public List<Friend> findAll() {

        final String sql = "select friendAId, friendBId, name, friend.app_user_id "
                + "from friend "
                + "left outer join app_user on app_user.app_user_id = friend.app_user_id ";

        return jdbcTemplate.query(sql, new FriendMapper());
    }

    @Override
    public Friend findFriendById(int id) throws DataAccessException {
        final String sql = "select friendAId, friendBId, name, friend.app_user_id "
        + "from friend "
        + "inner join app_user on app_user.app_user_id = friend.app_user_id "
        + "where friend.app_user_id = ?;";

        return jdbcTemplate.query(sql, new FriendMapper(), id).stream()
                .findFirst().orElse(null);
    }
}
