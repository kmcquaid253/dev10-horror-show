package horror.controller;

import horror.domain.FriendService;
import horror.models.Friend;
import horror.models.Movie;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@CrossOrigin(origins = {"http://localhost:8080"})
@RequestMapping("/api/friend")
public class FriendController {

    private final FriendService service;

    public FriendController(FriendService service) {
        this.service = service;
    }

    @GetMapping
    public List<Friend> findAll() { return service.findAll(); }

    @GetMapping("/{friendId}")
    public Friend findById(@PathVariable int friendId) {
        return service.findById(friendId);
    }
}
