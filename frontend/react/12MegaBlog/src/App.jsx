import { useState, useEffect } from 'react'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authSlice'
import { Header, Footer, LogoutBtn } from './components'
import { Outlet } from 'react-router-dom'


function App() {

    const [loading, setLoading] = useState(true)
    // const [posts, setPosts] = useState([])
    const dispatch = useDispatch()


    useEffect(() => {
        authService.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }))
                } else {
                    dispatch(logout())
                }
            })
            .catch((error) => console.error("useEffect - getCurrentUser: ", error))
            .finally(() => setLoading(false))
    })

    return !loading ? (
        <>
            <div className='min-h-screen flex flex-col content-between bg-gray-600'>
                <Header />

                <main>
                    <Outlet />
                </main>

                <h1>data...</h1>

                <Footer />
            </div>
        </>
    ) : (null)
}

export default App
