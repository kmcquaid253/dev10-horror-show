export function updateWatchlist(watchlist, showErrors, auth, setWatched, setWatchLater) {

    //Use fetch to POST to the service
    fetch("http://localhost:8080/api/watchlist", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${auth.user.token}`,
        },
        body: JSON.stringify(watchlist),
    })
        //fetch returns a response
        .then(async response => {
            if (response.status === 204) {
                setWatchLater(watchlist.filter((e) => e.watchLater));
                setWatched(watchlist.filter((i) => i.watched));
                return;
            }
            return Promise.reject(await response.json());

        })
        .catch(errorRequest => {
            if (errorRequest instanceof TypeError) {
                showErrors(["Could not connect to the api."]);//put string into an array because it's handeling multiple error messages
            } else {
                showErrors(errorRequest);
            }
        });
}