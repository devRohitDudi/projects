import { useState } from 'react'
import './App.css'

function App() {





    let [counter, changeCounter] = useState(10)
    let maxCount = 20;
    let minCount = 0;
    let addCountLeft = maxCount - counter
    let removeCountLeft = minCount - counter


    const addValue = () => {
        if (counter == 20) {
            alert("Maximum value is 20. try decreasing the counter!")
            // return;
        }
        else {
            changeCounter(counter += 1)
        }
    }
    const removeValue = () => {
        if (counter == 0) {
            alert("Counter can't be negative. try increasing the counter!")
            // return;
        }
        else {
            changeCounter(counter -= 1)
        }
    }


    return (
        <>
            <h1>Welcome to Counter!</h1>
            <h2>Counter value is: </h2>
            <h1>{counter}</h1>
            <br />
            <p>click on buttons to change the value</p>
            <p>Note: remember that the counter has limitations, if you need unlimited counter try premium for free.</p>
            <br />
            <button onClick={addValue}>Add value ({addCountLeft} remaining)</button>
            <br />
            <button onClick={removeValue}>Remove value ({removeCountLeft} remaining)</button>
        </>
    )
}

export default App
