import React from 'react'
import UseWindowResize from './UseWindowResize'
function TestWindowResize() {

    const windowSize = UseWindowResize()
    const { height, width } = windowSize
    return (
        <div className='min-h-screen w-full flex bg-slate-700 text-white flex-col items-center '>
            <div className='m-6 flex flex-col gap-2 text-xl '>
                <h1>Window height is: {height}</h1>
                <h1>Window width is: {width}</h1>
            </div>
            <p>Change the size and see the live coordinates.</p>
        </div>
    )
}

export default TestWindowResize