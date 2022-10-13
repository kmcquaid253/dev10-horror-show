package horror.domain;

import horror.data.ActorRepository;
import horror.models.Actor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActorService {

    private final ActorRepository repository;

    public ActorService(ActorRepository repository) {
        this.repository = repository;
    }


    public List<Actor> findAll() { return repository.findAll(); }
    public Actor findById(int actorId) {
        return repository.findActorById(actorId); //todo: validation?
    }
}
