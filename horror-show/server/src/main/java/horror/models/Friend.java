package horror.models;

public class Friend {

    private AppUser userA;

    private AppUser userB;

    public AppUser getUserA() {
        return userA;
    }

    public void setUserA(AppUser userA) {
        this.userA = userA;
    }

    public AppUser getUserB() {
        return userB;
    }

    public void setUserB(AppUser userB) {
        this.userB = userB;
    }
}
