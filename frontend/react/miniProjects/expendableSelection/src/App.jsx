import { useState } from 'react'
import Block from './components/Block'

function App() {
    const [blocks, setBlocks] = useState(Array(4).fill(false))
    const [multiSelection, setMultiSelection] = useState(false)

    const questions = [
        {
            question: "What is Quantum Mechanics?",
            answer: "Quantum mechanics is the branch of physics that describes the behavior of particles at the atomic and subatomic levels. It introduces concepts like wave-particle duality, superposition, quantum entanglement, and quantum interference.",
        },
        {
            question: "What is General Relativity?",
            answer: "General relativity, proposed by Einstein, describes gravity as the curvature of spacetime caused by mass and energy. It predicts phenomena like black holes, time dilation, and gravitational waves.",
        },
        {
            question: "What is the Heisenberg Uncertainty Principle?",
            answer: "It states that you cannot simultaneously know both the exact position and momentum of a particle. The more precisely one is measured, the less precise the other becomes.",
        },
        {
            question: "What is Dark Matter and Dark Energy?",
            answer: `Dark Matter: An unknown form of matter that does not emit light but has gravitational effects.
            Dark Energy: A mysterious force driving the accelerated expansion of the universe.`,
        },
    ]

    const handleExpand = (blockId) => {
        console.log("the blocks are:", blocks);


        setBlocks(prevBlocks =>
            prevBlocks.map((value, index) =>
                multiSelection ?
                    (index === blockId ? !value : false) : //if multiSelection is true
                    (index === blockId ? !value : value)
            )
        )
    }

    return (
        < >
            <div className='bg-violet-900 h-screen w-full justify-center items-center flex flex-col hover:cursor-pointer'>
                <button onClick={() => setMultiSelection(e => !e)}
                    className={`p-2 rounded-xl  text-white font-bold hover:cursor-pointer 1 ${multiSelection ? "bg-green-900" : "bg-amber-600"}`}>
                    {multiSelection == true ? "Enable multi selection" : "disbale multi selection"}
                </button>

                <Block isActive={blocks[0]} title={questions[0].question} value={questions[0].answer} onClick={() => handleExpand(0)} />
                <Block isActive={blocks[1]} title={questions[1].question} value={questions[1].answer} onClick={() => handleExpand(1)} />
                <Block isActive={blocks[2]} title={questions[2].question} value={questions[2].answer} onClick={() => handleExpand(2)} />
                <Block isActive={blocks[3]} title={questions[3].question} value={questions[3].answer} onClick={() => handleExpand(3)} />
            </div>
        </>
    )
}

export default App
