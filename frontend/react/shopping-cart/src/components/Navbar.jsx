import React from 'react'
import { Link, useLocation } from 'react-router-dom'
function Navbar() {
    const location = useLocation()

    return (
        <div className='flex w-full justify-between items-center pl-6 pr-6 p-2 font-bold bg-violet-900'>

            <Link to='/' className={`text-slate-200 pl-2 pr-2 p-1 rounded-xl`}>React Redux Shopping app</Link>

            <div>
                <input type="text"
                    className='bg-black w-flex text-white rounded-bl-xl rounded-tl-xl p-1 pl-3 pr-2 '
                    placeholder='What product is in your mind?' />
                <button className='bg-green-700 p-1 pl-2 pr-3 rounded-br-xl hover:cursor-pointer rounded-tr-xl'>Find it</button>
            </div>

            <div className='flex gap-4'>
                <Link className={`${location.pathname === '/cart' ? 'text-amber-600' : null} pl-2 pr-2 p-1 rounded-xl`} to='/cart'>Cart</Link>

                <Link className={`${location.pathname === '/details' ? 'text-amber-600' : null} pl-2 pr-2 p-1 rounded-xl`} to='/details'>Details</Link>
            </div>

        </div>
    )
}

export default Navbar