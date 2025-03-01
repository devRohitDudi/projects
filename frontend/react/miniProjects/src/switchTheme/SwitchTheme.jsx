import { useState } from "react"

function SwitchTheme() {
    const [currentTheme, setCurrentTheme] = useState("light")
    const [currentBgColor, setCurrentBgColor] = useState('white')
    const [currentTextColor, setCurrentTextColor] = useState('black')

    const toggleTheme = () => {
        // setCurrentTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light')
        // setCurrentBgColor(currentTheme === 'dark' ? 'black' : 'white')
        // setCurrentTextColor(currentTheme === 'dark' ? 'white' : 'black')

        //this won't work as expected because currentTheme changing asynchronously and bgColor & textColor states rely on old state immedietely

        setCurrentTheme((prevTheme) => {
            const newTheme = prevTheme === 'dark' ? 'light' : 'dark'
            setCurrentTextColor(newTheme === 'dark' ? 'white' : 'dark')
            setCurrentBgColor(newTheme === 'dark' ? 'black' : 'white')
            return newTheme
        })
    }

    return (
        <div className={`bg-${currentBgColor} text-${currentTextColor}  w-full h-screen flex justify-normal items-center `}>
            <div className="flex flex-col justify-normal items-start gap-5 p-5">
                <h1 className="text-2xl">This is the title</h1>
                <p>And this is an article inside a page of a small theme switching project in react using vite bundler tool that optimizes the size of projects.</p>
                <button className={`bg-${currentBgColor} font-bold rounded-xl p-2 border hover:cursor-pointer`} onClick={toggleTheme}>Switch {currentTheme === "light" ? "dark" : "light"} Theme </button>
            </div>
        </div >
    )
}

export default SwitchTheme
