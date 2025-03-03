import { useState, useEffect } from 'react'


function SearchSuggest() {
    const [search, setSearch] = useState('Rohit')
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchUsers = async (inputState) => {
        try {
            setLoading(true)
            const response = await fetch(`https://dummyjson.com/users/search?q=${inputState}`)
            const data = await response.json()

            if (data && data.users && data.users.length > 0) {
                console.log("users:", users);
                setUsers(data.users)
                setLoading(false)
            }
        } catch (error) {
            setError(error)
            console.log("error:", error)
        }
    }
    useEffect(() => {
        fetchUsers(search)
    }, [search])


    const renderProfile = (user) => {
        return (
            <div>
                <h1>Full name: {`${user.firstname} ${user.lastName}`}</h1>
                <h2>Age:{user.age}</h2>
                <h2>Email:{user.email}</h2>
                <h2>Phone:{user.phone}</h2>
                <h2>Gneder:{user.gender}</h2>
            </div>
        )
    }

    return (
        <div className='bg-gray-300 gap-3 w-full min-h-screen flex flex-col items-center '>
            <input className='bg-white sticky top-0 mt-3 p-2 rounded-xl text-xl' onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search users here' />

            <div>
                {
                    loading == true ? <h1>Loading...</h1> : null
                }
                {
                    users && users.length > 0 ?
                        users.map((user) => (
                            <div className='flex flex-col gap-5' key={user.id}>
                                <div onClick={renderProfile(user)} className='bg-gray-900 flex p-4 gap-5 rounded-2xl text-white' >
                                    <img className='h-6 w-6 rounded-full  ' src={user.image} alt={user.firstName} />
                                    <h1 className='text-l'>{`${user.firstName} ${user.lastName}`}</h1>
                                </div>

                            </div>

                        )) : <p>Updating state...</p>
                }

                {
                    error ? <p>Error occured! Mr. rohit please check the code.</p> : null
                }
            </div>
        </div >
    )
}
export default SearchSuggest