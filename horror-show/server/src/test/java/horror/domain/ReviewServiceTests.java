package horror.domain;

import horror.data.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
public class ReviewServiceTests {

    @Autowired
    ReviewService service;

    @MockBean
    ReviewRepository repository;
}
