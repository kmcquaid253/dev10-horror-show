package horror.domain;

import horror.data.ActorRepository;
import horror.models.Actor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class ActorServiceTests {

    @Autowired
    ActorService service;

    @MockBean
    ActorRepository repository;

    @Test
    void shouldFindById(){
        Actor actor = makeActor();
        actor.setActorId(1);
        when(repository.findActorById(1)).thenReturn(actor);
        Actor actual = service.findById(1);
        assertEquals(actor, actual);
    }

    Actor makeActor() {
        Actor actor = new Actor();
        actor.setFirstName("Bob");
        actor.setLastName("Labob");
        actor.setNationality("French");
        return actor;
    }
}
