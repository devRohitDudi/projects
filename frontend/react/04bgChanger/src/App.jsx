import { useState } from 'react'
import './App.css'

function App() {

    let [color, setColor] = useState("green");

    const changeBG = (clr) => {
        setColor(clr)
    }

    return (
        <>
            <div className='bg-blue-950 p-0 m-0 h-screen w-screen flex items-center justify-center '
                style={{ backgroundColor: color }}>
                <div style={{ backgroundColor: "white" }} className='display-flex gap-10 p-5 rounded-2xl'>
                    <button onClick={() => changeBG("red")} style={{ backgroundColor: "red" }}>red</button>
                    <button onClick={() => changeBG("green")} style={{ backgroundColor: "green" }}>green</button>
                    <button onClick={() => changeBG("blue")} style={{ backgroundColor: "blue" }}>blue</button>
                    <button onClick={() => changeBG("olive")} style={{ backgroundColor: "olive" }}>olive</button>
                    <button onClick={() => changeBG("purple")} style={{ backgroundColor: "purple" }}>purple</button>
                    <button onClick={() => changeBG("violet")} style={{ backgroundColor: "violet" }}>Violet</button>
                    {/* onclick expects function reference, don't need to execute it right here with params */}
                </div>
            </div>
        </>
    )
}

export default App
