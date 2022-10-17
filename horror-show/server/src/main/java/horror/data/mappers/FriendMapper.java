package horror.data.mappers;

import horror.models.AppUser;
import horror.models.Friend;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class FriendMapper implements RowMapper<Friend> {

    public Friend mapRow(ResultSet resultSet, int i) throws SQLException {
//        final String sql = "select appA.app_user_id as AId,\n" +
//                "appB.app_user_id as BId,\n" +
//                "appA.username as Auser,\n" +
//                "appB.username as Buser\n" +

//            public AppUser(int appUserId, String username, String password,
//        boolean disabled, List<String> roles)

        int AId = resultSet.getInt("AId");
        int BId = resultSet.getInt("BId");
        String Auser = resultSet.getString("Auser");
        String Buser = resultSet.getString("Buser");

        AppUser appUserA = new AppUser(AId, Auser, "", false, List.of("USER"));
        AppUser appUserB = new AppUser(BId, Buser, "", false, List.of("USER"));

        Friend friend = new Friend();
        friend.setUserA(appUserA);
        friend.setUserB(appUserB);
        return friend;
    }
}
