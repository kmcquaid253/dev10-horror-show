package horror.data;

import horror.models.Review;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface ReviewRepository {

    List<Review> findAll() throws DataAccessException;

    Review findById(int id) throws DataAccessException;

    Review create(Review review) throws DataAccessException;

    boolean update(Review review) throws DataAccessException;

    boolean deleteById(int id) throws DataAccessException;

}
