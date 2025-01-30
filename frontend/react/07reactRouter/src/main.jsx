import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import Home from './components/home.jsx'
import About from './components/about.jsx'
import Contact from './components/contact.jsx'
import User from './components/user.jsx'
import Github, { LoadGithubInfo } from "./components/github.jsx"

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
//layout is the outlet
import Layout from './layout.jsx'

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <Layout />,
//         children: [
//             {
//                 path: "/",
//                 element: <Home />
//             },
//             {
//                 path: "about",
//                 element: <About />
//             },
//             {
//                 path: "contact",
//                 element: <Contact />
//             }
//         ]
//     }
// ])

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />}>
            <Route path='' element={<Home />} />
            <Route path='contact' element={<Contact />} />
            <Route path='about' element={<About />} />


            {/* loader improves the optimization by fetching it by hover */}
            <Route loader={LoadGithubInfo} path='github' element={<Github />} />

            {/* dynamic sagment in router */}
            <Route path='user' element={<User />} />
            <Route path='user/:userid' element={<User />} />
        </Route>
    )
)

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
