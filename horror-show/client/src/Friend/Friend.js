import './Friend.css';
import {Link} from "react-router-dom";
import {useParams} from 'react-router-dom';

function Friend({ friendData }){

    const {userId} = useParams();

    return(

        <div className="friendCard">
            <div className="card-header">

                <h5 className='name'>{friendData.username}</h5>
            </div>
            <div className="card-body">
            {/* <button className="btn friendReview"><Link to={"/friendreview/" + friendData.userId} className="navbar-textdecoration">Reviews</Link></button> */}
            </div>
        </div>
    );

}

export default Friend;