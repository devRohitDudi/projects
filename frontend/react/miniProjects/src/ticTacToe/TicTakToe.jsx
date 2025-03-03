import { useState } from 'react'
import Block from './Block'

function TicTacToe() {
    const [currentTurn, setCurrentTurn] = useState('X')
    const [blocks, setBlocks] = useState(Array(9).fill(null))

    const toggleTurn = (index) => {
        console.log("clicked on index:", index);

        if (blocks[index] !== null) {
            return
        } setCurrentTurn(prevTurn => {
            const newTurn = prevTurn === "X" ? "O" : "X"
            setBlocks(prevBlocks => [...prevBlocks, blocks[index] = newTurn])
            return newTurn
        })
    }

    return (
        <div className='m-4 flex flex-col'>
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

        </div>
    )
}

export default TicTacToe