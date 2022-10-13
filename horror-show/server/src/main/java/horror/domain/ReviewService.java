package horror.domain;

import horror.data.ReviewRepository;
import horror.models.Review;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository repository;

    public ReviewService(ReviewRepository repository) {
        this.repository = repository;
    }

    public List<Review> findAll() {
        return repository.findAll();
    }

    public Review findById(int reviewId) { return repository.findById(reviewId);}

    public Result<Review> add(Review review) {
        Result<Review> result = validate(review);
        if (!result.isSuccess()) {
            return result;
        }

        if (review.getReviewId() != 0) {
            result.addMessage("reviewId cannot be set for 'add' operation", ResultType.INVALID);
            return result;
        }

        review = repository.create(review);
        result.setPayload(review);
        return result;
    }

    public Result<Review> update(Review review) {
        Result<Review> result = validate(review);
        if (!result.isSuccess()) {
            return result;
        }

        if (review.getReviewId() <= 0) {
            result.addMessage("reviewId must be set for 'update' operation", ResultType.INVALID);
            return result;
        }

        if (!repository.update(review)) {
            String msg = String.format("reviewId: %s, not found", review.getReviewId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(int reviewId) {
        return repository.deleteById(reviewId);
    }

    private Result<Review> validate(Review review) {
        Result<Review> result = new Result<>();
        if (review == null) {
            result.addMessage("Review cannot be null", ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(review.getUserReview())) {
            result.addMessage("Written review is required.", ResultType.INVALID);
        }

        return result;
    }


}
