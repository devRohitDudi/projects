import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux"
import { decrement, increment, incrementByValue } from './redux/slices/counter';

function App() {
    const count = useSelector((state) => state.counter.value)
    const totalValue = useSelector((state) => state.counter.totalValue)

    const [inputValue, setInputValue] = useState(0)
    const dispatch = useDispatch()

    return (
        <>
            <div className='h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-center'>
                <div className='text-[30px] pt-20 flex flex-col gap-4'>
                    <h1>Counter is: {count}</h1>
                    <h1>Total value is: {totalValue}</h1>
                </div>
                <div className=' pt-10 flex flex-col gap-4'>
                    <button className='border border-gray-400 rounded-xl p-2 hover:cursor-pointer' onClick={() => dispatch(increment())}>increment</button>
                    <button className='border border-gray-400 rounded-xl p-2 hover:cursor-pointer' onClick={() => dispatch(decrement())}>decrement</button>
                </div>
                <div className=' mt-10 flex flex-col gap-3'>
                    <input type='number' placeholder='Enter amount' className='w-[200px] border border-gray-400' onChange={(e) => setInputValue(e.target.value)} />
                    <button className='border border-gray-400 rounded-xl p-2 hover:cursor-pointer' onClick={() => dispatch(incrementByValue(inputValue))} >Add value</button>
                </div>
            </div>
        </>
    )
}

export default App
