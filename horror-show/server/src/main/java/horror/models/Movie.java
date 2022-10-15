package horror.models;

import java.time.LocalDate;
import java.util.List;

public class Movie {

    private int id;

    private String title;

    private int runtime;

    private String rating;

    private LocalDate release_date;

    private double vote_average;

    private List<Actor> actorId; // subject to change based on bridge table?
    // going to focus on this when we list out movies from external api

    private int directorId;

    private int subgenreId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getRuntime() {
        return runtime;
    }

    public void setRuntime(int runtime) {
        this.runtime = runtime;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public LocalDate getRelease_date() {
        return release_date;
    }

    public void setRelease_date(LocalDate release_date) {
        this.release_date = release_date;
    }

    public double getVote_average() {
        return vote_average;
    }

    public void setVote_average(double vote_average) {
        this.vote_average = vote_average;
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