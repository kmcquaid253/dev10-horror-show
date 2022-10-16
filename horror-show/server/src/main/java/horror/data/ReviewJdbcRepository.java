package horror.data;

import horror.data.mappers.ReviewMapper;
import horror.models.Review;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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
        final String sql = "select reviewId, userReview, app_user.app_user_id, movie.movieId, movie.title, movie.runtime, movie.rating, " +
                " movie.releaseDate, movie.scoreNum, movie.directorId, movie.subgenreId "
                + "from review "
                + "left outer join app_user on app_user.app_user_id = review.app_user_id "
                + "left outer join movie on movie.movieId = review.movieId";

        return jdbcTemplate.query(sql, new ReviewMapper());
    }

    @Override
    public Review findById(int id) throws DataAccessException {
        final String sql =  "select reviewId, userReview, app_user.app_user_id, movie.movieId, movie.title, "
                + "movie.runtime, movie.rating, movie.releaseDate, movie.scoreNum, movie.directorId, movie.subgenreId "
                + "from review "
                + "left outer join app_user on app_user.app_user_id = review.app_user_id "
                + "left outer join movie on movie.movieId = review.movieId "
                + "where reviewId = ?";

        return jdbcTemplate.query(sql, new ReviewMapper(), id).stream()
                .findFirst().orElse(null);
    }

    @Override
    public Review create(Review review) throws DataAccessException {

        final String sql = "insert into review (userReview, app_user_id, movieId) "
                + " values (?,?,?)";

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

        final String sql = "update review set "
                + "userReview = ?, "
                + "app_user_id = ?, "
                + "movieId = ? "
                + "where reviewId = ?";

        return jdbcTemplate.update(sql,
                review.getUserReview(),
                review.getAppUserId(),
                review.getMovieId(),
                review.getReviewId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int id) throws DataAccessException {
        return jdbcTemplate.update("delete from review where reviewId = ?", id) > 0;
    }
}
