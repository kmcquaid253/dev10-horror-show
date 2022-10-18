import './Friend.css';

function Friend({ friendData }){

    // const friendURL = "http://localhost:8080/friend/" + userB;

    return(

        <div className="heading">
            <h1 className="heading-header">Friends</h1>

        <div className="friendCard">
            <div className="card-header">
                {/* <h5 className='name'>{userA}</h5> */}
                {/* <h5 className='name'>{userB}</h5> */}
                <h5 className='name'>{friendData.username}</h5>
            </div>
            <div className="card-body">
            </div>
        </div>
        </div>
    );

}

export default Friend;