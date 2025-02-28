import PropTypes from 'prop-types'
import React, { useState } from "react"
function Color() {

    const [currentType, setCurrenttype] = useState('hex')
    const [colorCode, setColorCode] = useState('#00000')
    const [isClicked, setIsClicked] = useState(false)

    const generateHex = () => {
        const randomHex = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
        setColorCode(randomHex)
    }
    const generateRGB = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const randomRGB = `rgb(${r}, ${g}, ${b})`;
        setColorCode(randomRGB)
    }
    const handleCopy = () => {
        setIsClicked(true)
        setTimeout(() => {
            setIsClicked(false)
        }, 3000)
    }
    return (
        <div className='pt-5 gap-3 h-screen w-full  flex flex-col justify-center items-center' style={{ background: colorCode }}>
            <div className='gap-4 flex flex-row justify-center items-center  text-2xl'>
                <button className='bg-gray-300 p-2 rounded-xl hover:cursor-pointer' onClick={() => setCurrenttype("hex")}>Choose Hex color</button>
                <button className='bg-gray-300 p-2 rounded-xl hover:cursor-pointer' onClick={() => setCurrenttype("rgb")}>Choose RGB Color</button>
            </div>

            <button className='bg-white font-bold rounded-xl p-3 hover:cursor-pointer text-2xl border' onClick={() => currentType === 'hex' ? generateHex() : generateRGB()}>Generate random color</button>

            <div className='text-center flex flex-col justufy-center item-center gap-4'>
                <h1 className='bg-gray-300 p-2 rounded-xl text-2xl'>Color type: {currentType}</h1>
                <button onClick={() => {
                    navigator.clipboard.writeText(colorCode)
                    handleCopy()
                }}
                    className='text-2xl bg-white font-bold hover:cursor-pointer border ' >
                    {colorCode}</button>
                <p className='shadow-lg shadow-black-500 p-1 text-white bg-gray-500 rounded-2xl '> {isClicked ? "color code copied to clipboard" : "click on color to copy"}</p>
            </div>
        </div >
    )
}
Color.propTypes = {
    colorType: PropTypes.string,
    colorCode: PropTypes.string
}
export default Color