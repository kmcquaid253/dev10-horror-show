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
<<<<<<< HEAD
                friendList.sort((f) => f.friendBId)
=======
                //friendList.sort((a, b) => a.friendAId - b.friendAId, a.friendAId - b.friendBId)
>>>>>>> 15bb5d711f02f9c1dd800e7aef3749bcb7d68353
                setFriends(friendList);
            });
    }

    useEffect(
        () => {
            loadAllFriends();
        }, []);

    return (
        <>
<<<<<<< HEAD
            {friends.map( f => <Friends key={f.friendBId} />) }
=======
            {friends.map( a => 
                <Friends key={a.friendAId} friendData={a} />) } 
                    
>>>>>>> 15bb5d711f02f9c1dd800e7aef3749bcb7d68353
        </>

    );



}

export default loadFriends;