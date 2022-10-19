package horror.models;

public class Watchlist {

    private int watchlistId;

    private int movieId;

    private Movie movie;

    private int appUserId;

    private boolean watchLater;

    private boolean watched;

    public int getWatchlistId() {
        return watchlistId;
    }

    public void setWatchlistId(int watchlistId) {
        this.watchlistId = watchlistId;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }


    public boolean isWatchLater() {
        return watchLater;
    }

    public void setWatchLater(boolean watchLater) {
        this.watchLater = watchLater;
    }

    public boolean isWatched() {
        return watched;
    }

    public void setWatched(boolean watched) {
        this.watched = watched;
    }


    public void setAppUserId(int appUserId) { this.appUserId = appUserId; }

    public int getAppUserId() {
        return appUserId;
    }
}
