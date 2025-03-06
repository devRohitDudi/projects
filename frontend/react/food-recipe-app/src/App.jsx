import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Details, Navbar, Favorites, Results } from './index'
import GlobalState from './context/Context'

function App() {

    return (
        <div className='min-h-screen w-full flex flex-col items-center bg-slate-700 text-white'>
            <div className='w-full'>
                < Navbar />
            </div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/recipe-item/:id' element={<Details />} />
                <Route path='/favorites' element={<Favorites />} />
                <Route path='/results' element={<Results />} />
            </Routes>
        </div>
    )
}

export default App
