package horror.data;

import horror.models.Review;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class ReviewJdbcRepositoryTests {

    static final int NEXT_ID = 1;

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

        assertTrue(reviews.size() >= 2);
    }

    @Test
    void shouldAdd() {
        Review review = makeReview();
        Review actual = repository.create(review);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getReviewId());
    }

    private Review makeReview() {
        Review review = new Review();
        review.setUserReview("This movie was good. I liked it.");
        review.setAppUserId(1);
        review.setMovieId(1);
        return review;
    }
}
