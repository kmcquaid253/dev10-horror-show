package horror.models;

public class Friend {

    private int friendAId;

    private int friendBId;

    private String name;

    private int AppUserId;

    public int getFriendAId() {
        return friendAId;
    }

    public void setFriendAId(int friendAId) {
        this.friendAId = friendAId;
    }

    public int getFriendBId() {
        return friendBId;
    }

    public void setFriendBId(int friendBId) {
        this.friendBId = friendBId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAppUserId() {
        return AppUserId;
    }

    public void setAppUserId(int appUserId) {
        AppUserId = appUserId;
    }
}
