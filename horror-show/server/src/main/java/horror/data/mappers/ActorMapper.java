package horror.data.mappers;

import horror.models.Actor;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ActorMapper implements RowMapper<Actor> {

    public Actor mapRow(ResultSet resultSet, int i) throws SQLException {
        Actor actor = new Actor();
        actor.setActorId(resultSet.getInt("actorId"));
        actor.setFirstName(resultSet.getString("firstName"));
        actor.setLastName(resultSet.getString("lastName"));
        actor.setNationality(resultSet.getString("nationality"));
        return actor;
    }
}
