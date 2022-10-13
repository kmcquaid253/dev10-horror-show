package horror.data;


import horror.models.Subgenre;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class SubgenreJdbcTemplateRepositoryTests {

    @Autowired
    SubgenreJdbcRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }


    @Test
    void shouldFindAll() {
        List<Subgenre> actors = repository.findAll();
        assertNotNull(actors);
        assertTrue(actors.size() >= 2);
    }


    @Test
    void shouldFindHorrorSubgenre() {
        Subgenre subgenre = repository.findSubgenreById(1);
        assertEquals(1, subgenre.getSubgenreId());
        assertEquals("Horror", subgenre.getName());
    }

    @Test
    void shouldFindThrillerSubgenre() {
        Subgenre subgenre = repository.findSubgenreById(2);
        assertEquals(2, subgenre.getSubgenreId());
        assertEquals("Thriller", subgenre.getName());
    }
}
