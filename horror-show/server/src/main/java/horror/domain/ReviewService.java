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

    public boolean deleteById(int reviewId) {
        return repository.deleteById(reviewId);
    }

    public Result<Review> add(Review review) {
        throw new UnsupportedOperationException();
    }
}
