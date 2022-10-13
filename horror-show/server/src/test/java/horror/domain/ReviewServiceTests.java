package horror.domain;

import horror.data.ReviewRepository;
import horror.models.Review;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.mockito.Mockito.when;

@SpringBootTest
public class ReviewServiceTests {

    @Autowired
    ReviewService service;

    @MockBean
    ReviewRepository repository;

    @Test
    void shouldAdd() {
        Review review = makeReview();
        Review mockOut = makeReview();
        mockOut.setReviewId(1);

        when(repository.create(review)).thenReturn(mockOut);

        Result<Review> actual = service.add(review);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotAddWhenInvalid() {
        Review review = makeReview();
        review.setUserReview("  ");

        Result<Review> actual = service.add(review);
        assertEquals(ResultType.INVALID, actual.getType());

        review = makeReview();
        review.setUserReview(null);
        actual = service.add(review);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldUpdate() {
        Review review = makeReview();
        review.setReviewId(1);

        when(repository.update(review)).thenReturn(true);

        Result<Review> actual = service.update(review);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateWhenInvalid() {
        Review review = makeReview();
        Result<Review> actual = service.update(review);
        assertEquals(ResultType.INVALID, actual.getType());

        review = makeReview();
        review.setReviewId(1);
        review.setUserReview(" ");
        actual = service.update(review);
        assertEquals(ResultType.INVALID, actual.getType());

        review = makeReview();
        review.setReviewId(1);
        review.setUserReview(null);
        actual = service.update(review);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    Review makeReview() {
        Review review = new Review();
        review.setUserReview("This movie was good. I liked it.");
        review.setAppUserId(1);
        review.setMovieId(1);
        return review;
    }
}
