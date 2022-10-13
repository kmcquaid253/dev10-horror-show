package horror.data;

import horror.data.mappers.ActorMapper;
import horror.models.Actor;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ActorJdbcRepository implements ActorRepository {

    private final JdbcTemplate jdbcTemplate;

    public ActorJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }



    @Override
    public List<Actor> findAll() {

        final String sql = "select actorId, firstName, lastName, nationality "
                + "from actor;";

        return jdbcTemplate.query(sql, new ActorMapper());
    }

    @Override
    public Actor findActorById(int id) throws DataAccessException {
        final String sql = "select actorId, firstName, lastName, nationality "
                + "from actor "
                + "where actorId = ?;";

        return jdbcTemplate.query(sql, new ActorMapper(), id).stream()
                .findFirst().orElse(null);
    }
}
