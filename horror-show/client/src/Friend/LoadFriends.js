import { useEffect, useState } from "react";
import Friends from "../Friends";

function loadFriends() {

    const [friends, setFriends] = useState([]);

    function loadAllFriends() {
        fetch("http://localhost:8080/api/friend")
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else (console.log(response))
            })
            .then(friendList => {
                friendList.sort((f) => f.friendBId)
                setFriends(friendList);
            });
    }

    useEffect(
        () => {
            loadAllFriends();
        }, []);

    return (
        <>
            {friends.map( f => 
                <Friends key={f.friendAId} friendData={f} />) } 
                    
        </>

    );



}

export default loadFriends;