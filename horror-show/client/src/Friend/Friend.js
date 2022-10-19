import './Friend.css';
import {Link} from "react-router-dom";


function Friend({ friendData, appUserId }){


    return(

        <div className="friendCard">
            <div className="card-header">

                <h5 className='name'>{friendData.username}</h5>
            </div>
            <div className="card-body">
                <button className="btn friendWatched"><Link to={"/friendwatched"} className="navbar-textdecoration">Watched Movies</Link></button>
            </div>
        </div>
    );

}

export default Friend;