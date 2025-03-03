function Popup({ onClose }) {

    return (
        <div className="flex flex-col justify-center item-center mt-3 bg-blue-300 p-4 gap-4 rounded-2xl">
            <div className="flex justify-end items-center">
                <button className="bg-yellow-400 pt-1 pb-1 pr-3 pl-3 rounded-xl hover:cursor-pointer" onClick={onClose}>X</button>
            </div>
            <div className="header-container">
                <h1 className="text-2xl">Header of popup</h1>
            </div>
            <div className="body-container">
                <p>The Body Of a custom popup in react mini project</p>
            </div>
            <div className="footer-container">
                <h2 className="text-xl">And a footer</h2>
            </div>
        </div>
    )
}

export default Popup