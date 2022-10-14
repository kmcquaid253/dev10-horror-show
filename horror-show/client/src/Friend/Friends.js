import { useState } from "react";

function Friends({name}){

    return(

        <div className="container">
            <h2>Friends:</h2>

            <div className="card">
                <div className="card-header">
                    <h5>{name}</h5>
                </div>
                <div className="card-body">
                    <button className="button">See Reviews</button>
                </div>
            </div>
        </div>
    );

}

export default Friends;