package horror.models;

public class Watchlist {

    private Movie movie;


    private int appUserId;

    private Boolean watchLater;

    private Boolean watched;

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public int getAppUserId() {
        return appUserId;
    }

    public void setAppUserId(int appUserId) {
        this.appUserId = appUserId;
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
