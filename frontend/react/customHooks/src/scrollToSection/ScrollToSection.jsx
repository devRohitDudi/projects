import React, { useRef } from 'react'

function ScrollToSection() {
    const ref = useRef()
    const sectionData = [
        {
            label: "Top Section",
            style: {
                height: '600px',
                backgroundColor: 'green',
                width: '100%',
            }
        },
        {
            label: "Second Section",
            style: {
                height: '600px',
                backgroundColor: 'orange',
                width: '100%',
            }
        },
        {
            label: "Third Section",
            style: {
                height: '600px',
                backgroundColor: 'purple',
                width: '100%',
            }
        },
        {
            label: "Fourth Section",
            style: {
                height: '600px',
                backgroundColor: 'violet',
                width: '100%',
            }
        },
        {
            label: "Fifth Section",
            style: {
                height: '600px',
                backgroundColor: 'blue',
                width: 'flex',
            }
        },
    ]

    const scrollToSection = () => {
        let position = ref.current.getBoundingClientRect().top

        window.scrollTo({
            top: position,
            behavior: 'smooth'
        })
    }


    return (
        <div className='bg-slate-700 text-white min-h-screen flex flex-col justify-center w-full p-5'>
            <h1>Scrool to a Particular Section</h1>
            <button className='text-2xl bg-blue-600 p-2 m-3 rounded-2xl' onClick={scrollToSection}>Click to scroll</button>
            {
                sectionData.map((section, index) => (
                    <div ref={index === 3 ? ref : null} key={index} style={section.style} className='text-2xl text-white'>
                        <h1 h1 > {section.label}</h1>
                    </div >
                ))
            }
        </div >
    )
}

export default ScrollToSection