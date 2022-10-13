package horror.domain;

import horror.data.DirectorRepository;
import horror.models.Director;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class DirectorServiceTests {

    @Autowired
    DirectorService service;

    @MockBean
    DirectorRepository repository;

    @Test
    void shouldFindById() {
        Director director = makeDirector();
        director.setDirectorId(1);
        when(repository.findDirectorById(1)).thenReturn(director);
        Director actual = service.findById(1);
        assertEquals(director, actual);
    }

    Director makeDirector() {
        Director director = new Director();
        director.setFirstName("Barb");
        director.setLastName("Smith");
        director.setNationality("American");
        return director;
    }

}
