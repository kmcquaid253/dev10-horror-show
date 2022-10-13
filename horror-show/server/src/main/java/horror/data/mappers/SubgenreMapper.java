package horror.data.mappers;

import horror.models.Subgenre;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class SubgenreMapper implements RowMapper<Subgenre> {

    public Subgenre mapRow(ResultSet resultSet, int i) throws SQLException {
        Subgenre subgenre = new Subgenre();
        subgenre.setSubgenreId(resultSet.getInt("subgenreId"));
        subgenre.setName(resultSet.getString("name"));

        return subgenre;
    }
}
