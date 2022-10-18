import './Friend.css';

function Friend({ friendData }){

    return(

        <div className="friendCard">
            <div className="card-header">

                <h5 className='name'>{friendData.username}</h5>
            </div>
            <div className="card-body">
            </div>
        </div>
    );

}

export default Friend;