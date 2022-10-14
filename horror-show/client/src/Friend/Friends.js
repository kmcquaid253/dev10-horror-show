import './Friends.css';

function Friends(){

    const friendURL = "";

    return(

        <div className="heading">
            <h1 className="heading-header">Friends</h1>

        <div className="card">
            <div className="card-header">
                <h5>Friend Name goes here</h5>
            </div>
            <div className="card-body">
                <button onClick={friendURL} className="button">See Reviews</button>
            </div>
        </div>
        </div>
    );

}

export default Friends;