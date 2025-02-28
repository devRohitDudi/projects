import {
    Accordian, Rating, Random, Treepage,
    Home, Navbar, Slider, Loadmore
} from './index.js'

// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
    // const router = createBrowserRouter([
    //     {
    //         path: "/",
    //         element: <Home />,
    //         children: [
    //             { path: "/accordian", element: <Accordian />, },
    //             { path: "/random-color", element: <Random />, },
    //             { path: "/star-rating", element: <Rating />, },
    //             { path: "/image-slider", element: <Slider />, },
    //             { path: "/load-more", element: <Loadmore />, },
    //             { path: "/tree-view", element: <Treepage />, },
    //         ]
    //     },
    // ])

    return (
        <>
            {/* <Navbar />
            <RouterProvider router={router}>
            </RouterProvider> */}
            <Router>
                <div className='flex flex-col justify-between items-center w-full'>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/accordian" element={<Accordian />} />
                        <Route path="/random-color" element={<Random />} />
                        <Route path="/star-rating" element={<Rating />} />
                        <Route path="/image-slider" element={<Slider />} />
                        <Route path="/load-more" element={<Loadmore />} />
                        <Route path="/tree-view" element={<Treepage />} />
                    </Routes>
                </div>
            </Router>
        </>
    )
}
export default App