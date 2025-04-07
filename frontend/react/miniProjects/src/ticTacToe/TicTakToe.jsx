import { useState } from 'react'
import Block from './Block'

function TicTacToe() {
    const [currentTurn, setCurrentTurn] = useState('X')
    const [blocks, setBlocks] = useState(Array(9).fill(null))

    const [winMessage, setWinMessage] = useState('')

    const checkWin = (updatedBlocks) => {
        const winCoordinates = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8],
            [2, 4, 6],
        ]

        for (let combination of winCoordinates) {
            const [a, b, c] = combination
            if (updatedBlocks[a] != null && updatedBlocks[a] === updatedBlocks[b] && updatedBlocks[b] === updatedBlocks[c]) {
                return true
            }
        }
        return false
    }

    const toggleTurn = (index) => {

        console.log("clicked on index:", index);

        if (blocks[index] !== null) {
            return
        }

        const updatedBlocks = [...blocks]
        updatedBlocks[index] = currentTurn
        setBlocks(updatedBlocks)

        if (checkWin(updatedBlocks)) {
            setWinMessage(`User ${currentTurn} has won the game!`)
            return
        }

        setCurrentTurn(prevTurn => prevTurn == "X" ? "O" : "X")
    }

    const resetGame = () => {
        setBlocks(Array(9).fill(null))
        setCurrentTurn('X')
        setWinMessage('')
    }

    return (
        <div className='p-4 bg-gray-300 justify-start items-center min-h-screen w-full flex flex-col'>
            <div className='flex'>
                <Block onClick={() => toggleTurn(0)} value={blocks[0]} />
                <Block onClick={() => toggleTurn(1)} value={blocks[1]} />
                <Block onClick={() => toggleTurn(2)} value={blocks[2]} />
            </div>
            <div className='flex'>
                <Block onClick={() => toggleTurn(3)} value={blocks[3]} />
                <Block onClick={() => toggleTurn(4)} value={blocks[4]} />
                <Block onClick={() => toggleTurn(5)} value={blocks[5]} />
            </div>
            <div className='flex'>
                <Block onClick={() => toggleTurn(6)} value={blocks[6]} />
                <Block onClick={() => toggleTurn(7)} value={blocks[7]} />
                <Block onClick={() => toggleTurn(8)} value={blocks[8]} />
            </div>

            <div className='flex flex-col mt-4 gap-4'>
                {
                    winMessage && winMessage.length > 0 ?
                        <p className='text-xl'>{winMessage}</p> : null
                }
                <button className='p-2 rounded-xl bg-blue-600 hover:cursor-pointer text-white' onClick={resetGame}>Restart game</button>
            </div>
        </div >
    )
}

export default TicTacToe