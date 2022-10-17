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
                friendList.sort((a, b) => a.friendAId - b.friendAId, a.friendAId - b.friendBId)
                setFriends(friendList);
            });
    }

    useEffect(
        () => {
            loadAllFriends();
        }, []);

    return (
        <>
            {friends.map( a => <Friends key={(a.friendAId, b.friendBId)} friendData={(a, b)} />) }
        </>

    );

}

export default loadFriends;