package horror.data.mappers;

import horror.models.Director;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class DirectorMapper implements RowMapper<Director> {

    public Director mapRow(ResultSet resultSet, int i) throws SQLException {
        Director director = new Director();
        director.setDirectorId(resultSet.getInt("directorId"));
        director.setFirstName(resultSet.getString("firstName"));
        director.setLastName(resultSet.getString("lastName"));
        director.setNationality(resultSet.getString("nationality"));
        return director;
    }
}
