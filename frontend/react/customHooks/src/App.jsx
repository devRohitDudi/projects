import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
    UsingHook, TestOnclickOutside, TestWindowResize,
    ScrollToSection, ScrollToTarget
} from './index'
import Navbar from './Navbar'

function App() {
    return (
        <Router >
            <div className='min-h-screen w-full'>
                <Navbar className='bg-gray-900 text-white' />
                <Routes>
                    <Route path='/use-fetch' element={<UsingHook />} />
                    <Route path='/onclick-outside' element={<TestOnclickOutside />} />
                    <Route path='/use-window-resize' element={<TestWindowResize />} />
                    <Route path='/scroll-to-target' element={<ScrollToTarget />} />
                    <Route path='/scroll-to-section' element={<ScrollToSection />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App
