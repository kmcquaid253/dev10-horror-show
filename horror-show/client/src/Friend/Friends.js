import './Friends.css';

function Friends({ name }){

    const friendURL = "";

    return(

        <div className="heading">
            <h1 className="heading-header">Friends</h1>

        <div className="friendCard">
            <div className="card-header">
                <h5 className='name'>{name}</h5>
            </div>
            <div className="card-body">
                <button onClick={friendURL} className="button">See Reviews</button>
            </div>
        </div>
        </div>
    );

}

export default Friends;