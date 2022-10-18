package horror.controller;

import horror.domain.FriendService;
import horror.models.AppUser;
import horror.models.Friend;
import horror.security.AppUserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/friend")
public class FriendController {

    private final FriendService service;

    private final AppUserService appUserService;

    public FriendController(FriendService service, AppUserService appUserService) {
        this.service = service;
        this.appUserService = appUserService;
    }

    @GetMapping
    public List<Friend> findById() {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        AppUser appUser = (AppUser) appUserService.loadUserByUsername(username);

        return service.findById(appUser.getAppUserId());
    }
}
