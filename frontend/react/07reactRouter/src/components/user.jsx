import { useParams } from "react-router-dom";

function User() {

    const { userid } = useParams();

    return (
        <>
            <h2 className=" bg-gray-800 p-4 text-white text-center">
                Enter a username in url to visit profile</h2>
            <h1 className=" text-center text-white text-3xl bg-gray-800 p-4">
                Username: {userid}
            </h1>
        </>
    )
}
export default User