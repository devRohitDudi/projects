import React, { useContext } from 'react'
import { GlobalContext } from '../context/Context'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
    const location = useLocation()
    const { searchParams, setSearchParams, searchRecipe } = useContext(GlobalContext)

    return (
        <div className='flex pl-6 p-3 fixed top-0 pr-6 w-full bg-gray-900  justify-between items-center'>

            <Link to='/' className='text-xl font-bold'>Food Recipe</Link>

            <div className='flex items-center'>
                <input type="text" placeholder='Search here... '
                    className=' pl-2 pt-1 pb-1 text-xl pr-2 shadow-xl bg-gray-100 text-black rounded-l-xl '
                    onChange={(e) => setSearchParams(e.target.value)}
                    value={searchParams}
                />
                <Link to='/results' onClick={searchRecipe} className='bg-green-700 pl-2 pt-1 pb-1 text-xl pr-2 rounded-r-xl shadow-xl font-bold'>Find it</Link>
            </div>

            <div className=' font-bold '>

                <Link to='/' className={`${location.pathname === '/' ? 'bg-[rgba(43,127,255,0.8)]' : null}
                        p-1 pl-3 pr-3  rounded-xl`}>Home</Link>

                <Link to='/favorites' className={`${location.pathname === '/favorites' ? 'bg-[rgba(43,127,255,0.8)]' : null} 
                        p-1 pl-3 pr-3 rounded-xl`}>Favorites</Link>
            </div>

        </div >
    )
}

export default Navbar