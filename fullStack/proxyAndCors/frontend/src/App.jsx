import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
    const [jokes, setJokes] = useState([])


    useEffect(() => {
        axios.get("/api/jokes")
            .then((response) => {
                setJokes(response.data)
            })
            .catch((error) => {
                console.log("while fetching by axios:", error);
            })
    }, [])

    return (
        <>
            <div className='bg-gray-900 text-white h-screen w-full p-0 m-0 flex flex-col justify-start items-center pt-2'>
                <h1>Hello</h1>
                <h2>Jokes:{jokes.length}</h2>
                <br />


                <div className='bg-gray-900 text-white h-screen w-80% p-0 m-0 flex flex-col justify-start items-start pt-2'>
                    {
                        jokes.map((joke) => (
                            <div key={joke.id} className='flex justify-start items-center w-50% g-2' >
                                <h3 className='bg-yellow-700 p-2 m-2 rounded-lg'>{joke.title}</h3>
                                <p className='text-center'>{joke.content}</p>
                            </div>
                        ))
                    }
                </div>

            </div>

        </>
    )
}

export default App
