package horror.data;

import horror.data.mappers.DirectorMapper;
import horror.models.Director;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DirectorJdbcRepository implements DirectorRepository {

    private final JdbcTemplate jdbcTemplate;

    public DirectorJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public List<Director> findAll() {

        final String sql = "select directorId, firstName, lastName, nationality "
            + "from director;";

        return jdbcTemplate.query(sql, new DirectorMapper());
    }

    @Override
    public Director findDirectorById(int id) throws DataAccessException {
        final String sql = "select directorId, firstName, lastName, nationality "
                + "from director "
                + "where directorId = ?;";

        return jdbcTemplate.query(sql, new DirectorMapper(), id).stream()
                .findFirst().orElse(null);
    }
}
