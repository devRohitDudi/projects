import { useEffect, useState } from 'react'
import Block from './components/Block.jsx'

function App() {

    const [state, setState] = useState(Array(9).fill(null))
    const [currentTurn, setCurrentTurn] = useState("X")
    const [isWon, setIsWon] = useState(false)

    const checkWin = (state) => {
        const coordinates = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8],
            [2, 4, 6],
        ]
        for (let i = 0; i < coordinates.length; i++) {

            const [a, b, c] = coordinates[i]

            if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
                return state[a]
            }
            else {
                setIsWon(false)
            }
        }
    }

    useEffect(() => {
        const winner = checkWin(state)
        if (winner) {
            setIsWon(true)
            setCurrentTurn(winner)
            console.log("winner is", winner);

            setTimeout(() => {
                alert(`${winner} player won the game!`)
            }, 500);
        }
    }, [state, currentTurn])


    const handleClick = (index) => {
        if (isWon) {
            window.location.reload()
        }
        console.log("isWon is", isWon);

        const stateCopy = Array.from(state)
        console.log(stateCopy);

        if (state[index] !== null) {
            return
        }
        stateCopy[index] = currentTurn

        setCurrentTurn(currentTurn === "X" ? "O" : "X")

        setState(stateCopy)

        // checkWin(stateCopy)
    }

    return (
        <>
            <div className=' h-screen w-full bg-green-300 p-10 flex flex-col align-center items-center '>
                <h1 className='text-[25px] font-bold'>Tic Tac Toe</h1>
                <div className='flex flex-row pt-40'>
                    <div>
                        <Block onClick={() => handleClick(0)} value={state[0]} />
                        <Block onClick={() => handleClick(1)} value={state[1]} />
                        <Block onClick={() => handleClick(2)} value={state[2]} />
                    </div>
                    <div>
                        <Block onClick={() => handleClick(3)} value={state[3]} />
                        <Block onClick={() => handleClick(4)} value={state[4]} />
                        <Block onClick={() => handleClick(5)} value={state[5]} />
                    </div>
                    <div>
                        <Block onClick={() => handleClick(6)} value={state[6]} />
                        <Block onClick={() => handleClick(7)} value={state[7]} />
                        <Block onClick={() => handleClick(8)} value={state[8]} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default App
