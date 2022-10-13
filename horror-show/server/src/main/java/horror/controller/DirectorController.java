package horror.controller;

import horror.domain.DirectorService;
import horror.models.Director;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/director")
public class DirectorController {

    private final DirectorService service;

    public DirectorController(DirectorService service) {
        this.service = service;
    }


    @GetMapping
    public List<Director> findAll() { return service.findAll(); }

    @GetMapping("/{directorId}")
    public Director findById(@PathVariable int directorId) {
        return service.findById(directorId);
    }

}
