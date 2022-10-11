package horror.data;

import horror.models.Review;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReviewJdbcRepository implements ReviewRepository{
    @Override
    public List<Review> findAll() throws DataAccessException {
        return null;
    }

    @Override
    public Review create(Review review) throws DataAccessException {
        return null;
    }

    @Override
    public boolean update(Review review) throws DataAccessException {
        return false;
    }

    @Override
    public boolean deleteById(int id) throws DataAccessException {
        return false;
    }
}
