package horror.domain;

import horror.data.FriendRepository;
import horror.data.MovieRepository;
import horror.models.Friend;
import horror.models.Movie;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendService {

    private final FriendRepository repository;

    public FriendService(FriendRepository repository) {
        this.repository = repository;
    }


    public List<Friend> findAll() { return repository.findAll(); }
    public Friend findById(int friendId) {
        return repository.findFriendById(friendId); //todo: validation?
    }
}
