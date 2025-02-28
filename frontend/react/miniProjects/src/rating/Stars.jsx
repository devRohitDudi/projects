import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa';

function Stars({ starsCount }) {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)

    return (
        <div className='flex mt-10 flex flex-col'>
            <div className='flex mb-5'>
                {[...Array(starsCount)].map((value, index) => {

                    index += 1
                    return <FaStar
                        key={index}
                        className={index <= (hover || rating) ? "fill-amber-500" : 'fill-black'}
                        onClick={() => setRating(index)}
                        onMouseMove={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                        size={40}
                    />
                })}
            </div>
            <h2>Hover and click to see the effect</h2>
        </div>
    )
}

export default Stars