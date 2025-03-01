import { useState } from 'react'
import QRCode from 'react-qr-code'

function QrGenerator() {
    const [currentInput, setCurrentInput] = useState('')
    const [totalInput, setTotalInput] = useState('')
    const [isGenerated, setIsGenerated] = useState(false)

    const generateCode = () => {
        console.log("Clicked");
        setTotalInput(currentInput)
        setCurrentInput("")
        setIsGenerated(true)
    }
    return (
        <div>
            <div className='p-4 gap-4 flex '>
                <input value={currentInput}
                    className='border p-2 rounded-xl text-xl' placeholder="Enter text or URL" onChange={(e) => setCurrentInput(e.target.value)} type="text" />
                <button disabled={currentInput === ''} className=' rounded-2xl shadow-lg bg-green-300 p-2 text-xl hover:cursor-pointer' onClick={generateCode}  >Generate QRCode</button>
            </div>
            <div className='flex gap-5 flex-col justify-center items-center'>
                <QRCode
                    id="qr-code-value"
                    value={totalInput}
                    size={400}
                    bgColor='#fff'
                />
                {
                    isGenerated === true ?
                        <p>Qr Code for {`"${totalInput}"`} is generated.</p> : null
                }
            </div>
        </div>
    )
}

export default QrGenerator