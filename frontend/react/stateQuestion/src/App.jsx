import { useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
    const [count, setCount] = useState(1)

    //using state re render whole component so it is not efficient
    // const [multipliedValue, setMultipliedValue] = useState(null)

    let initialValue = count
    let multipliedValue = count * 5

    function multiply() {
        // setMultipliedValue(count * 5)
        setCount(count + 1)
    }

    return (
        <>
            <h1>Original value: {initialValue}</h1>
            <button onClick={multiply}>click to multiply by 5</button>
            <h1>multiplied value: {multipliedValue ? multipliedValue : "click on multiply"}</h1>
        </>
    )
}

export default App
