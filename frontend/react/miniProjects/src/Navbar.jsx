import { Link, useLocation } from 'react-router-dom'
function Navbar() {
    const location = useLocation();

    return (
        <div className='flex flex-wrap w-full justify-center gap-5 p-5 items-center bg-gray-800'>
            <Link to="/" > <button className={` ${location.pathname === '/' ? "text-blue-500" : 'text-white'}  text-l font-bold hover:cursor-pointer`}>Home</button>  </Link>
            <Link to="/accordian" > <button className={` ${location.pathname === '/accordian' ? "text-blue-500" : 'text-white'}  text-l font-bold hover:cursor-pointer`}>Accordian</button>  </Link>
            <Link to="/random-color" > <button className={` ${location.pathname === '/random-color' ? "text-blue-500" : 'text-white'}  text-l font-bold hover:cursor-pointer`}>Random-Color</button>  </Link>
            <Link to="/star-rating" > <button className={` ${location.pathname === '/star-rating' ? "text-blue-500" : 'text-white'}  text-l font-bold hover:cursor-pointer`}>Star-Rating</button>  </Link>
            <Link to="/image-slider" > <button className={` ${location.pathname === '/image-slider' ? "text-blue-500" : 'text-white'}  text-l font-bold hover:cursor-pointer`}>Image-Slider</button>  </Link>
            <Link to="/load-more" > <button className={` ${location.pathname === '/load-more' ? "text-blue-500" : 'text-white'}  text-l font-bold hover:cursor-pointer`}>Load-More</button>  </Link>
            <Link to="/tree-view" > <button className={` ${location.pathname === '/tree-view' ? "text-blue-500" : 'text-white'}  text-l font-bold hover:cursor-pointer`}>Tree-View</button>  </Link>
            <Link to="/qr-code" > <button className={` ${location.pathname === '/qr-code' ? "text-blue-500" : 'text-white'}  text-l font-bold hover:cursor-pointer`}>QR-Code</button>  </Link>
            <Link to="/switch-theme" > <button className={` ${location.pathname === '/switch-theme' ? "text-blue-500" : 'text-white'}  text-l font-bold hover:cursor-pointer`}>Switch-Theme</button>  </Link>
            <Link to="/scroll-progress" > <button className={` ${location.pathname === '/scroll-progress' ? "text-blue-500" : 'text-white'}  text-l font-bold hover:cursor-pointer`}>Scroll-Progress</button>  </Link>
            <Link to="/custom-tabs" > <button className={` ${location.pathname === '/custom-tabs' ? "text-blue-500" : 'text-white'}  text-l font-bold hover:cursor-pointer`}>Tabs</button>  </Link>
        </div >
    )
}

export default Navbar