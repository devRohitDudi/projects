import React, { useState, useRef } from 'react'
import UseOnclickOutside from './UseOnclickOutside'
function TestOnclickOutside() {
    const [showContent, setShowContent] = useState(false)
    const ref = useRef()
    UseOnclickOutside(ref, () => setShowContent(false))
    return (
        <div className='min-h-screen w-full bg-gray-200 flex  items-center flex-col'>
            {
                showContent ?
                    <div className=' m-3 flex flex-col gap-5 p-4 bg-yellow-200 rounded-xl items-center text-center w-100 ' ref={ref}>
                        <h1 className='text-2xl '>This is the content</h1>
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Ex esse ad iure dolores asperiores. Laborum quam, iure,
                            explicabo fugiat expedita voluptatum fugit voluptates
                            officia eaque nobis ut consequatur,
                            distinctio architecto.
                        </p>
                        <p>Click outside to hide me!</p>
                    </div>
                    : <div className='bg- gap-5 p-4  items-center text-center w-100'>
                        <button className='bg-green-400 font-bold p-2 rounded-xl hover:cursor-pointer' onClick={() => setShowContent(true)}>Show Content</button>
                    </div>
            }
        </div>
    )
}

export default TestOnclickOutside