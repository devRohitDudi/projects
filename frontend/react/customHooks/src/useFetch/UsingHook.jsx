import React, { useState } from 'react'
import UseFetch from './UseFetch'

function UsingHook() {
    const [url, setUrl] = useState("https://dummyjson.com/users?limit=10&select=firstName,age,lastName")
    const { data, error, pending } = UseFetch(url, {})

    console.log("data:", data, "error:", error, "pending", pending);

    function setTheURLState() {
        setUrl(`https://dummyjson.com/users?limit=10&select=firstName,age,lastName`)
    }
    // &timestamp=${new Date().getTime()}

    return (
        <div>
            <h1>{data}using UseFetch hook</h1>
            {pending && <h1>Loading...</h1>}
            {error && <h1>Error type: {error.message}</h1>}
            {
                data && data.users && data.users.length ?
                    data.map((userItem, index) => {
                        return (
                            <div key={index}>
                                <h1>{userItem.firstName}</h1>
                                <h1>{userItem.lastName}</h1>
                            </div>
                        )
                    }) : null
            }
            <button onClick={setTheURLState}>Fetch again</button>
        </div >
    )
}

export default UsingHook