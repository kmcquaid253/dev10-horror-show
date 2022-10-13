package horror.data;

import horror.models.Actor;
import horror.models.Director;
import horror.models.Movie;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class ActorJdbcTemplateRepositoryTests {

    @Autowired
    ActorJdbcRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }


    @Test
    void shouldFindAll() {
        List<Actor> actors = repository.findAll();
        assertNotNull(actors);
        assertTrue(actors.size() > 0);
    }


    @Test
    void shouldFindActorOfId1() {
        Actor actor = repository.findActorById(1);
        assertEquals(1, actor.getActorId());
        assertEquals("Sissy", actor.getFirstName());
        assertEquals("Spacek", actor.getLastName());
        assertEquals("American", actor.getNationality());
    }
}
