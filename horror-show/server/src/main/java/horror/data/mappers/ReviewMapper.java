package horror.data.mappers;

import horror.models.Review;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReviewMapper implements RowMapper<Review> {


    @Override
    public Review mapRow(ResultSet resultSet, int i) throws SQLException {
       Review review = new Review();
       review.setReviewId(resultSet.getInt("reviewId"));
       review.setUserReview(resultSet.getString("userReview"));
       review.setAppUserId(resultSet.getInt("app_user_id"));
       review.setMovieId(resultSet.getInt("movieId"));
       return review;
    }
}
