package horror.data;

import horror.data.mappers.ReviewMapper;
import horror.models.Review;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class ReviewJdbcRepository implements ReviewRepository{

    private final JdbcTemplate jdbcTemplate;

    public ReviewJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public List<Review> findAll() throws DataAccessException {
        final String sql = "select reviewId, userReview, app_user_id, movieId "
                + "from review "
                + "inner join app_user on app_user.app_user_id = review.app_user_id"
                + "inner join movie on movie.movieId = review.movieId;";
        return jdbcTemplate.query(sql, new ReviewMapper());
    }

    @Override
    public Review create(Review review) throws DataAccessException {

        final String sql = "insert into review (userReview, app_user_id, movieId) "
                + " values (?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, review.getUserReview());
            ps.setInt(2, review.getAppUserId());
            ps.setInt(3, review.getMovieId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        review.setReviewId(keyHolder.getKey().intValue());
        return review;
    }

    @Override
    public boolean update(Review review) throws DataAccessException {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean deleteById(int id) throws DataAccessException {
        throw new UnsupportedOperationException();
    }
}
