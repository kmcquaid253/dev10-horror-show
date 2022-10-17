package horror.models;

public class Watchlist {

    private Movie movie;

    private AppUser appUser;

    private Boolean watchLater;

    private Boolean watched;

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public Boolean getWatchLater() {
        return watchLater;
    }

    public void setWatchLater(Boolean watchLater) {
        this.watchLater = watchLater;
    }

    public Boolean getWatched() {
        return watched;
    }

    public void setWatched(Boolean watched) {
        this.watched = watched;
    }
}
