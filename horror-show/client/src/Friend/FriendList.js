import { useContext, useEffect, useState } from "react";
import AuthContext from "../AuthContext/AuthContext";
import Friend from "./Friend";

function FriendList() {

    const [friends, setFriends] = useState([]);
    const auth = useContext(AuthContext);

    function loadAllFriends() {
        fetch("http://localhost:8080/api/friend", {
            headers: {
                Authorization: `Bearer ${auth.user.token}`
            }

        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else (console.log(response))
            })
            .then(friendList => {
                friendList.sort((a, b) => a.friendBId - b.friendBId)
                setFriends(friendList);
            });
    }

    useEffect(
        () => {
            loadAllFriends();
        }, []);

    return (
        <>
        <video autoPlay loop muted play inline class="back-video">
            <source src="fire4.mp4" type="video/mp4"/>
        </video>
        
        <div className="heading">
            <h1 className="heading-header">Friends</h1>

        <>
            {friends.map( (f, i) => 
                <Friend key={i} friendData={f.userA.appUserId == auth.user.userId ? f.userB : f.userA} />) }                   
        </>
        </div>
        </>
    );
}

export default FriendList;