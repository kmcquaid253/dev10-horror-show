import React from "react";
import { Link } from "react-router-dom";

import "./WatchlistNavbar.css";

export default function NavBar(){
    return (
        <div className="watchlistNav">
            <div className="logo">
                <h1 id="logo">watchlist</h1>
            </div>
            <ul>
                <Link to="/watchlater"><li>Watch Later</li></Link>
                <Link to="/watched"><li>Watched</li></Link>
                <li>Watched</li>
            </ul>
        </div>
    )
}