package horror.domain;

import horror.data.FriendRepository;
import horror.models.Friend;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendService {

    private final FriendRepository repository;

    public FriendService(FriendRepository repository) {
        this.repository = repository;
    }

    public List<Friend> findById(int friendId) {
        return repository.findFriendsById(friendId); //todo: validation?
    }
}
