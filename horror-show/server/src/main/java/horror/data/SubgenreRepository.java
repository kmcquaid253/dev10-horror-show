package horror.data;

import horror.models.Subgenre;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface SubgenreRepository {
    List<Subgenre> findAll();

    Subgenre findSubgenreById(int id) throws DataAccessException;
}
