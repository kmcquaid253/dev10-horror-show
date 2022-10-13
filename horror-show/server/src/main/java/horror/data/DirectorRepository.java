package horror.data;

import horror.models.Director;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface DirectorRepository {
    List<Director> findAll();

    Director findDirectorById(int id) throws DataAccessException;
}
