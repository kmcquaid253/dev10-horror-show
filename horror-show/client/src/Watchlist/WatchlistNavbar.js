import React from "react";
import "./WatchlistNavbar.css";

export default function NavBar(){
    return (
        <div className="watchlistNav">
            <div className="logo">
                <h1 id="logo">watchlist</h1>
            </div>
            <ul>
                <li>Watch Later</li>
                <li>Watched</li>
            </ul>
        </div>
    )
}