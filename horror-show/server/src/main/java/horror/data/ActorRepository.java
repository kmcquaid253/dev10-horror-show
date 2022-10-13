package horror.data;

import horror.models.Actor;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface ActorRepository {

    List<Actor> findAll();

    Actor findActorById(int id) throws DataAccessException;
}
