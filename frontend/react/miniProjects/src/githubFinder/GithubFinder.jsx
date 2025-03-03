import { useState } from 'react'
import Profile from './Profile'
function GithubFinder() {
    let username = 'DevRohitDudi'
    const [fullUsername, setFullUsername] = useState("DevRohitDudi")

    function handleFullUsername() {
        setFullUsername(username)
    }
    return (
        <div className='p-2 h-full w-full flex flex-col items-center gap-5 bg-[#302d07] text-white'>
            <div className=' flex flex-col justify-center items-center gap-2 '>
                <h1 className='text-2xl mt-5'>Github Profile Finder</h1>
                <div className='flex justify-center items-center gap-1'>
                    <input
                        className='border border-black text-black bg-white rounded-xl p-2'
                        onChange={(e) => username = e.target.value}
                        type="text"
                        placeholder='Enter a username...'
                    />
                    <button className='bg-green-600 hover:cursor-pointer rounded-xl font-bold p-2' onClick={handleFullUsername}>Find it</button>
                </div>
            </div>
            <div>
                <Profile usernameProp={fullUsername} />
            </div>
        </div>
    )
}

export default GithubFinder