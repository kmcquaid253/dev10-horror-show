package horror.domain;

import horror.data.DirectorRepository;
import horror.models.Director;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DirectorService {

    private final DirectorRepository repository;

    public DirectorService(DirectorRepository repository) {
        this.repository = repository;
    }


    public List<Director> findAll() { return repository.findAll(); }
    public Director findById(int directorId) {
        return repository.findDirectorById(directorId);
    }
}
