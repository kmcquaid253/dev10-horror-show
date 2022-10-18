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
            </div>
        </div>
    );

}

export default Friend;