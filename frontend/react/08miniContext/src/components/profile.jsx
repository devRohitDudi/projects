import React, { useContext } from "react";
import UserContext from "../context/userContext";

function Profile() {

    const { user } = useContext(UserContext);


    if (!user) return <h3 id="message">Please login to continue </h3>
    return <h3 id="message">Welcome {user.username}! </h3>
}

export default Profile