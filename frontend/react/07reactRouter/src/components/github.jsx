import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";


function GithubInfo() {

    const data = useLoaderData()

    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     fetch("https://api.github.com/users/DevRohitDudi")
    //         .then(response => response.json())
    //         .then(data => setData(data));
    // }, [])

    return (
        <>
            <div className="w-screen bg-gray-800 text-center flex-col align-middle justify-center p-4 g-11">
                <div className="flex align-middle justify-center m-2">
                    <img className=" rounded-4xl self-center w-50 " src={data.avatar_url} alt="github-avatar" />

                </div>
                <h1 className="text-3xl text-white ">{data.name}</h1>
                <h1 className="text-2xl text-white ">Followers: {data.followers}</h1>
                <h1 className="text-1xl text-white ">Bio: {data.bio}</h1>
            </div>

        </>
    )
}

export const LoadGithubInfo = async () => {
    let response = await fetch("https://api.github.com/users/DevRohitDudi")
    console.log("fetched");
    return response.json()
}


export default GithubInfo



