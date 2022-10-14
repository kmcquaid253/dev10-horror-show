import { useEffect, useState } from "react";
import Friends from "./Friends";

function loadFriends() {

    const [friends, setFriends] = useState([]);

    function loadAllFriends() {
        fetch("http://localhost:8080/api/friends")
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else (console.log(response))
            })
            .then(friendList => {
                friendList.sort((a, b) => a.friendAId - b.friendAId)
                setFriends(friendList);
            });
    }

    useEffect(
        () => {
            loadAllFriends();
        }, []);

    return (
        <>
            {friends.map( a => <Friends key={a.friendAId} friendData={a} />) }
        </>
    );

}

export default loadFriends;