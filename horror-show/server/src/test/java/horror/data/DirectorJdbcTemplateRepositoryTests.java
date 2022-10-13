package horror.data;

import horror.models.Director;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class DirectorJdbcTemplateRepositoryTests {

    @Autowired
    DirectorJdbcRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }


    @Test
    void shouldFindAll() {
        List<Director> directors = repository.findAll();
        assertNotNull(directors);
        assertTrue(directors.size() > 0);
    }


    @Test
    void shouldFindDirectorOfId1() {
        Director director = repository.findDirectorById(1);
        assertEquals(1, director.getDirectorId());
        assertEquals("Brian", director.getFirstName());
        assertEquals("De Palma", director.getLastName());
        assertEquals("American", director.getNationality());
    }
}
