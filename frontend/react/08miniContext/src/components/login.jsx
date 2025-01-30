import React, { useState, useContext } from "react";
import UserContext from "../context/userContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { setUser } = useContext(UserContext);

    function submitAct(e) {
        e.preventDefault()
        if (!username || !password) {
            alert("Please enter details")
            return
        }
        setUser({ username, password })
    }

    return (
        <>
            <h1>Check Your Contect API</h1>
            <div className="loginDiv">
                <input id="input" type="text" placeholder="Enter username" value={username}
                    onChange={(e) => setUsername(e.target.value)} />

                <input id="input" type="text" placeholder="Enter password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <button onClick={submitAct}>Submit</button>
            </div>
        </>
    )
}

export default Login