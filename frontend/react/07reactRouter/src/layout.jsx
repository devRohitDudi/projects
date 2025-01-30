import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'

function Layout() {


    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}


export default Layout