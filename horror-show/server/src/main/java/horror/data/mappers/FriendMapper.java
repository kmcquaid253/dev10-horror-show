package horror.data.mappers;

import horror.models.Friend;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class FriendMapper implements RowMapper<Friend> {

    public Friend mapRow(ResultSet resultSet, int i) throws SQLException {
        Friend friend = new Friend();
        friend.setFriendAId(resultSet.getInt("friendAId"));
        friend.setFriendBId(resultSet.getInt("friendBId"));
        friend.setName(resultSet.getString("name"));
        friend.setAppUserId(resultSet.getInt("app_user_id"));
        return friend;
    }
}
