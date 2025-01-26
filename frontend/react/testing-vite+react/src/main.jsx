// import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'

const reactElement = React.createElement(
    'a',
    { href: 'https://rohitdudi.vercel.app', target: '_blank' },
    "Click here to visit RohitDudi's website."
)

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    /* <App /> */
    reactElement
    // </StrictMode>
)
