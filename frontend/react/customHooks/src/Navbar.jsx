import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
    const location = useLocation()
    return (
        <div className='w-full bg-gray-900 p-2 text-l font-bold flex gap-5 justify-center'>
            <Link to='/use-fetch' className={`${location.pathname === '/use-fetch' ? 'text-blue-400' : 'text-white'}`}>Test-UseFetch</Link>
            <Link to='/onclick-outside' className={`${location.pathname === '/onclick-outside' ? 'text-blue-400' : 'text-white'}`}>Test-UseOnclickOutside</Link>
            <Link to='/use-window-resize' className={`${location.pathname === '/use-window-resize' ? 'text-blue-400' : 'text-white'}`}>Test-UseWindowResize</Link>
            <Link to='/scroll-to-target' className={`${location.pathname === '/scroll-to-target' ? 'text-blue-400' : 'text-white'}`}>ScrollToTarget</Link>
            <Link to='/scroll-to-section' className={`${location.pathname === '/scroll-to-section' ? 'text-blue-400' : 'text-white'}`}>ScrollToSection</Link>
        </div>
    )
}

export default Navbar