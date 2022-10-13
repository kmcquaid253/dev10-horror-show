package horror.controller;

import horror.domain.SubgenreService;
import horror.models.Subgenre;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/subgenre")
public class SubgenreController {

    private final SubgenreService service;

    public SubgenreController(SubgenreService service) {
        this.service = service;
    }


    @GetMapping
    public List<Subgenre> findAll() { return service.findAll(); }

    @GetMapping("/{subgenreId}")
    public Subgenre findById(@PathVariable int subgenreId) {
        return service.findById(subgenreId);
    }

}
