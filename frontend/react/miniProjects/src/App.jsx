import {
    Accordian, Rating, Random, Treepage,
    Home, Navbar, Slider, Loadmore, QrGenerator, SwitchTheme, Scroll,
    TabMenu, PopupPage, GithubFinder, TicTacToe, SearchSuggest, FeatureFlag
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
    //             { path: "/qr-code", element: <QrGenerator />, },
    //             { path: "/switch-theme", element: <SwitchTheme />, },
    //             { path: "/scroll-progress", element: <Scroll />, },
    //             { path: "/custom-tabs", element: <TabMenu />, },
    //             { path: "/popup", element: <PopupPage />, },
    //             { path: "/github-finder", element: <GithubFinder />, },
    //             { path: "/tic-tac-toe", element: <TicTacToe />, },
    //             { path: "/search-suggest", element: <SearchSuggest />, },
    //             { path: "/feature-flag", element: <FeatureFlag />, },
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
                        <Route path="/qr-code" element={<QrGenerator />} />
                        <Route path="/switch-theme" element={<SwitchTheme />} />
                        <Route path="/scroll-progress" element={<Scroll />} />
                        <Route path="/custom-tabs" element={<TabMenu />} />
                        <Route path="/popup" element={<PopupPage />} />
                        <Route path="/github-finder" element={<GithubFinder />} />
                        <Route path="/tic-tac-toe" element={<TicTacToe />} />
                        <Route path="/search-suggest" element={<SearchSuggest />} />
                        <Route path="/feature-flags" element={<FeatureFlag />} />
                    </Routes>
                </div>
            </Router>
        </>
    )
}
export default App