package horror.controller;

import horror.domain.Result;
import horror.domain.ReviewService;
import horror.models.AppUser;
import horror.models.Review;
import horror.security.AppUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/review")
public class ReviewController {

    private final ReviewService service;
    private final AppUserService appUserService;

    public ReviewController(ReviewService service, AppUserService appUserService) {
        this.service = service;
        this.appUserService = appUserService;
    }


    @GetMapping
    public List<Review> findAll() { return service.findAll(); }

    @GetMapping("/{reviewId}")
    public Review findById(@PathVariable int reviewId) {
        return service.findById(reviewId);
    }


    @PostMapping
    public ResponseEntity<Object> create(@RequestBody Review review) {
        //security checks for role in add, delete, and update: widget manager
        AppUser appUser = (AppUser) appUserService.loadUserByUsername((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        review.setAppUserId(appUser.getAppUserId());
        Result<Review> result = service.add(review);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<Object> update(@PathVariable int reviewId, @RequestBody Review review) {
        AppUser appUser = (AppUser) appUserService.loadUserByUsername((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        review.setAppUserId(appUser.getAppUserId());
        if (reviewId != review.getReviewId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Review> result = service.update(review);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteById(@PathVariable int reviewId) {
        if (service.deleteById(reviewId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
