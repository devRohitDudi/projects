import React, { useEffect, useState } from 'react'
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs'
import './slider.css'
function Image({ url, page, limit, }) {

    const [currentSlide, setCurrentSlide] = useState(0)
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState(null)
    const [error, setError] = useState(null)

    const fetchImages = async (getURL) => {
        try {
            setLoading(true)
            const response = await fetch(`${getURL}page=${page}&limit=${limit}`)
                .then(response => response.json())
            setImages(response)
            console.log(response);
            setLoading(false)
        } catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        if (url == '') {
            setError("empty url!")
        }
        fetchImages(url)
    }, [])


    const handlePrevious = () => {
        setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1)
        //beacause we are comparing currentSlide value with array index
    }
    const handleNext = () => {
        setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1)
    }

    if (loading) {
        return (
            <div className=''>
                <h1 className=' text-center text-3xl font-bold'>Loading... Please wait.</h1>
            </div>
        )
    }
    return (
        <div className='container'>
            <div className='images'>
                <BsArrowLeftCircleFill onClick={handlePrevious} className='arrow arrow-right' />
                {images && images.length ?
                    images.map((image, index) => (
                        <img key={index}
                            src={image.download_url}
                            alt={`image by ${image.author}`}
                            className={currentSlide === index ? 'current-image' : "current-image hide-current-image"} />
                        //after checking this condition the loop will iterate itself again i guess
                    )) : null
                }
                <BsArrowRightCircleFill onClick={handleNext} className='arrow arrow-left' />
                <span className='circles'>
                    {
                        images && images.length ?
                            images.map((_, index) => (
                                <button key={index}
                                    className={currentSlide === index ? 'current-indicator' : "current-indicator hide-current-indicator"}
                                    onClick={() => setCurrentSlide(index)}>
                                </button>
                                //after checking this condition the loop will iterate itself again i guess
                            )) : null
                    }
                </span>
            </div>

            <p>{error && error}</p>
        </div >
    )
}

export default Image