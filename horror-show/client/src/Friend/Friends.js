import './Friends.css';

function Friends({ userA, userB }){

    const friendURL = "http://localhost:8080/friend/" + userA;

    return(

        <div className="heading">
            <h1 className="heading-header">Friends</h1>

        <div className="friendCard">
            <div className="card-header">
                <h5 className='name'>{userA}</h5>
                <h5 className='name'>{userB}</h5>
            </div>
            <div className="card-body">
                <button className="button">See Reviews</button>
            </div>
        </div>
        </div>
    );

}

export default Friends;