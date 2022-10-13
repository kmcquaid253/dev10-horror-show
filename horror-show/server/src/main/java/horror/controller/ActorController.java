package horror.controller;

import horror.domain.ActorService;
import horror.models.Actor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/actor")
public class ActorController {

    private final ActorService service;

    public ActorController(ActorService service) {
        this.service = service;
    }


    @GetMapping
    public List<Actor> findAll() { return service.findAll(); }

    @GetMapping("/{actorId}")
    public Actor findById(@PathVariable int movieId) {
        return service.findById(movieId);
    }

}
