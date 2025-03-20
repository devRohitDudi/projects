import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Navbar, Home, Cart, Details } from './index'


function App() {

    return (
        <div className='bg-slate-900 text-white min-h-screen w-full'>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/details' element={<Details />} />
            </Routes>
        </div>
    )
}

export default App
