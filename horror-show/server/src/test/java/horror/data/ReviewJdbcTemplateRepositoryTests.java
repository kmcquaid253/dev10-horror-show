package horror.data;

import horror.models.Review;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

@SpringBootTest
public class ReviewJdbcTemplateRepositoryTests {

    @Autowired
    ReviewJdbcRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup(){
        knownGoodState.set();
    }

    // have not hard - coded test data yet
    @Test
    void shouldFindAll() {
        List<Review> reviews = repository.findAll();
        assertNotNull(reviews);

        assertTrue(reviews.size() > 0);
    }

    @Test
    void shouldAdd() {
        Review review = makeReview();
        Review actual = repository.create(review);
        assertNotNull(actual);
    }

    @Test
    void shouldUpdate() {
        Review review = makeReview();
        review.setReviewId(2);
        assertTrue(repository.update(review));
        review.setReviewId(15);
        assertFalse(repository.update(review));
    }

    @Test
    void shouldDelete() {
        assertTrue(repository.deleteById(1));
        assertFalse(repository.deleteById(1));
    }

    private Review makeReview() {
        Review review = new Review();
        review.setUserReview("This movie was good. I liked it.");
        review.setAppUserId(1);
        review.setMovieId(1);
        return review;
    }
}
