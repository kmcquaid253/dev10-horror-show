package horror.domain;

import horror.data.FriendRepository;
import horror.models.Friend;
import org.springframework.stereotype.Service;

@Service
public class FriendService {

    private final FriendRepository repository;

    public FriendService(FriendRepository repository) {
        this.repository = repository;
    }

    public Friend findFriendById(int friendId) {
        return repository.findFriendById(friendId);
    }
}
