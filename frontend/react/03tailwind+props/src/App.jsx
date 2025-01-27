/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import Newsletter from './components/newsletter'

function App() {

    let userDetails = {
        name: "Rohit",
        email: "temp@temp.com"
    }

    return (
        <>
            <h3 className='bg-green-400 padding p-4 text-3xl rounded-2xl text-black'>hello from Tailwind+vite in React</h3>

            <Newsletter username="RohitDudi" btnText="Subscribe" user={userDetails} />
            <Newsletter username="Alex Stark" btnText="Renew" user={userDetails} />

        </>
    )
}

export default App
