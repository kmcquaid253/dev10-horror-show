import { useState } from "react";

function Friends(){

    const [errors, setErrors] = useState([]);
    const [friends, setFriends] = useState({});

    function handleSubmit(event) {//take in an event to prevent it from posting
        event.preventDefault();
    };

    return(

        <div className="container">
            <h2>Friends:</h2>
        </div>
    );

}

export default Friends;