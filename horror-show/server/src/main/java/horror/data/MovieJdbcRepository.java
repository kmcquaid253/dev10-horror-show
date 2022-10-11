package horror.data;

import horror.models.Movie;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MovieJdbcRepository implements MovieRepository {
    @Override
    public List<Movie> findAll() throws DataAccessException {
        return null;
    }

    @Override
    public Movie findById(int id) throws DataAccessException {
        return null;
    }

    @Override
    public Movie findFriendById(int id) throws DataAccessException {
        return null;
    }
}
