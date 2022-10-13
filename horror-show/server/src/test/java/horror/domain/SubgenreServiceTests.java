package horror.domain;

import horror.data.SubgenreRepository;
import horror.models.Subgenre;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class SubgenreServiceTests {

    @Autowired
    SubgenreService service;

    @MockBean
    SubgenreRepository repository;

    @Test
    void shouldFindById() {
        Subgenre subgenre = makeSubgenre();
        subgenre.setSubgenreId(1);
        when(repository.findSubgenreById(1)).thenReturn(subgenre);
        Subgenre actual = service.findById(1);
        assertEquals(subgenre, actual);
    }

    Subgenre makeSubgenre() {
        Subgenre subgenre = new Subgenre();
        subgenre.setName("Horror Comedy");
        return subgenre;
    }

}
