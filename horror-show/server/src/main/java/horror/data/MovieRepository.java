package horror.data;

import horror.models.Movie;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface MovieRepository {
    List<Movie> findAll() throws DataAccessException;
    Movie findById(int id) throws DataAccessException;
    Movie findFriendById(int id) throws DataAccessException;
}
