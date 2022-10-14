function Friends({name}){

    const friendURL = "";

    return(

        <div className="container">
            <h2>Friends:</h2>

            <div className="card">
                <div className="card-header">
                    <h5>{name}</h5>
                </div>
                <div className="card-body">
                    <button onClick={friendURL} className="button">See Reviews</button>
                </div>
            </div>
        </div>
    );

}

export default Friends;