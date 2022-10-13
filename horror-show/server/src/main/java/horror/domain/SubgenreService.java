package horror.domain;

import horror.data.SubgenreRepository;
import horror.models.Subgenre;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubgenreService {

    private final SubgenreRepository repository;

    public SubgenreService(SubgenreRepository repository) {
        this.repository = repository;
    }


    public List<Subgenre> findAll() { return repository.findAll(); }
    public Subgenre findById(int subgenreId) {
        return repository.findSubgenreById(subgenreId); //todo: validation?
    }
}
