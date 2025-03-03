import { useState } from 'react'
import Popup from './Popup'

function PopupPage() {
    const [showPopup, setShowPopup] = useState(false)
    const [buttonColor, setButtonColor] = useState('green')

    const handleToggle = () => {
        setShowPopup((prev) => {
            const newToggle = !prev
            setButtonColor(newToggle ? 'amber' : 'green')
            return newToggle
        })
    }

    return (
        <>
            <div className='bg-gray-400 h-screen w-full flex flex-col  items-center'>
                <div className={`mt-3  bg`}>
                    <button className={`text-xl bg-${buttonColor}-400 rounded-xl hover:cursor-pointer p-2`} onClick={handleToggle}>{showPopup ? "Hide" : "Show"} Popup Modal</button>
                </div>
                {
                    showPopup &&
                    <Popup onClose={handleToggle} />
                }
            </div>
        </>
    )
}

export default PopupPage