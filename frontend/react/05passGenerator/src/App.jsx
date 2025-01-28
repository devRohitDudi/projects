/* eslint-disable no-unused-vars */
import { useCallback, useState, useEffect, useRef } from 'react'

import './App.css'

function App() {

    const [password, setPassword] = useState("");
    const [passLength, setLength] = useState(8);
    const [numAllowed, setNumAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);


    const passwordGenerator = useCallback(() => {
        let pass = ''
        let str = "ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz";
        let nums = `0987654321`
        let chars = `~!@#$%^&*()_+=-`

        for (let i = 0; i <= passLength; i++) {
            let index = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(index)

            if (numAllowed) {
                index = Math.floor(Math.random() * nums.length + 1)
                pass += nums.charAt(index)
                i++
                // hahaha
            }
            if (charAllowed) {
                index = Math.floor(Math.random() * chars.length + 1)
                pass += chars.charAt(index)
                i++
            }
        }

        // console.log("numAllowed:", numAllowed);
        // console.log("charAllowed:", charAllowed)

        setPassword(pass);
        pass = '';

    }, [passLength, numAllowed, charAllowed, setPassword])



    //useRef hook
    const passwordRef = useRef(null);

    const copyToClipboard = useCallback(() => {
        passwordRef.current?.select()
        //selection for optimization
        passwordRef.current?.setSelectionRange(0, passLength + 1)
        window.navigator.clipboard.writeText(password);
    }, [password, passLength])



    useEffect(() => {
        passwordGenerator()
    }, [passLength, numAllowed, charAllowed, passwordGenerator])


    return (
        <>
            <div className=' flex-col justify-center align-middle h-screen w-full bg-black pt-30'>

                <h1 className='text-white text-center text-3xl'>Password Generator</h1>

                <div className=' self-center p-5 bg-gray-400 flex  flex-col justify-center align-middle gap-4'>

                    <div className='flex justify-center align-middle'>
                        <input ref={passwordRef} type="text" value={password} readOnly placeholder='Password' className='p-2 text-2xl bg-white rounded-l-2xl' />
                        <button onClick={copyToClipboard} className='bg-blue-600 p-2 rounded-r-2xl text-2xl text-white cursor-pointer'>Copy</button>
                    </div>

                    <div className='flex justify-center gap-3 align-middle'>

                        <div className=' gap-2 flex justify-center align-middle'>
                            <input value={passLength} type="range" min={8} max={40} className='p-2'

                                onChange={(e) => {
                                    setLength((prev) => prev = e.target.value)
                                    passwordGenerator()
                                }} />

                            <label className='text-2xl '>Length is: {passLength}</label>
                        </div>

                        <div className=' gap-2 flex justify-center align-middle'>
                            <input id='numbers' type="checkBox" className='p-2 max:{40} min:{8}'

                                onChange={() => {
                                    setNumAllowed(prev => prev = !prev)
                                    passwordGenerator()
                                }} />

                            <label htmlFor='numbers' className='text-2xl'>Numbers {numAllowed}</label>
                        </div>
                        <div className=' gap-2 flex justify-center align-middle'>
                            <input id="chars" type="checkBox" className='p-2 max:{40} min:{8}'

                                onChange={() => {
                                    setCharAllowed(prev => prev = !prev)
                                    passwordGenerator()
                                }} />

                            <label htmlFor='chars' className='text-2xl'>Symbols {charAllowed}</label>
                        </div>

                    </div>

                </div>
                <h2 className='text-white'>Enough UI</h2>
            </div>
        </>
    )
}

export default App
