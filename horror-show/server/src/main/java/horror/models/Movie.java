package horror.models;

import java.time.LocalDate;
import java.util.List;

public class Movie {

    private int movieId;

    private String title;

    private String runtime;

    private String rating;

    private LocalDate releaseDate;

    private int scoreNum;

    private List<Actor> actorId; // subject to change based on bridge table?
    // going to focus on this when we list out movies from external api

    private int directorId;

    private int subgenreId;

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getRuntime() {
        return runtime;
    }

    public void setRuntime(String runtime) {
        this.runtime = runtime;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public int getScoreNum() {
        return scoreNum;
    }

    public void setScoreNum(int scoreNum) {
        this.scoreNum = scoreNum;
    }

    public List<Actor> getActorId() {
        return actorId;
    }

    public void setActorId(List<Actor> actorId) {
        this.actorId = actorId;
    }

    public int getDirectorId() {
        return directorId;
    }

    public void setDirectorId(int directorId) {
        this.directorId = directorId;
    }

    public int getSubgenreId() {
        return subgenreId;
    }

    public void setSubgenreId(int subgenreId) {
        this.subgenreId = subgenreId;
    }
}
