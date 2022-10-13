package horror.data;


import horror.data.mappers.SubgenreMapper;
import horror.models.Subgenre;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SubgenreJdbcRepository implements SubgenreRepository {

    private final JdbcTemplate jdbcTemplate;

    public SubgenreJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Subgenre> findAll() {

        final String sql = "select subgenreId, name "
                + "from subgenre;";

        return jdbcTemplate.query(sql, new SubgenreMapper());
    }

    @Override
    public Subgenre findSubgenreById(int id) throws DataAccessException {
        final String sql = "select subgenreId, name "
                + "from subgenre "
                + "where subgenreId = ?;";

        return jdbcTemplate.query(sql, new SubgenreMapper(), id).stream()
                .findFirst().orElse(null);
    }
}
