import { useEffect, useState } from 'react'
import PropTypes from "prop-types";


function Profile({ usernameProp }) {
    const [userData, setUserData] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchUser = async () => {
        try {
            setLoading(true)
            const response = await fetch("https://api.github.com/users/" + usernameProp)
            const newUser = await response.json()
            setUserData(newUser)
            setLoading(false)
        } catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        if (usernameProp.length > 0) {
            fetchUser()
        }
    }, [usernameProp])
    console.log("userdata is:", userData);

    return (
        <div>
            {
                loading ? <h1>Loading... please wait for a sec.</h1> : null
            }
            {

            }
            {
                userData.message == 'Not Found' ? <h1>User not found! try a valid public username.</h1>
                    :
                    <div className='flex h-full flex-col items-center justify-center gap-4'>
                        <img className='h-40 w-40 rounded-full' src={userData.avatar_url} alt={userData.login} />

                        <div className='w-150 flex flex-col items-start gap-2 bg-black p-6 rounded-3xl'>
                            <div className='flex justify-center items-center gap-4'>
                                <h1 className='font-bold'>{userData.login}</h1>
                                <p>Created at: {userData.created_at}</p>
                            </div>

                            <h1 className='font-bold'>Name: {userData.name}</h1>
                            <h1 >Bio: {userData.bio}</h1>

                            <div className='flex gap-5'>
                                <h2 className='font-bold'>Followers: {userData.followers}</h2>
                                <h2 className='font-bold'>Follwing: {userData.following}</h2>
                            </div>

                        </div>

                        <div className='w-120 flex flex-col items-start gap-2 bg-black p-6 font-bold rounded-3xl'>
                            <h1>More details:</h1>
                            <h2>Website: {userData.blog ? userData.blog : "not available"}</h2>
                            <h2>Company: {userData.company ? userData.company : "not available"}</h2>
                            <h2>Email: {userData.company ? userData.company : "not publicly available, please check in bio as well."}</h2>
                            <h2>hireable: {userData.hireable ? userData.hireable : "status not available"}</h2>
                            <h2>Location: {userData.location ? userData.location : "not available"}</h2>
                            <h2>Twitter username: {userData.twitter_username ? userData.twitter_username : "not available"}</h2>

                        </div>
                    </div>
            }
            {
                error &&
                <p>Error occured! Mr. Rohit please check the code.</p>
            }
        </div>
    )
}
Profile.propTypes = {
    usernameProp: PropTypes.string.isRequired, // Ensures username is a required string
};
export default Profile