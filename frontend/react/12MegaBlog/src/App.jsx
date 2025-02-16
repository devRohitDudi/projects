import { useState, useEffect } from 'react'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'


function App() {

    const navigate = useNavigate()
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
                    navigate('/')
                }
            })
            .catch((error) => console.error("in useEffect getCurrentUser: ", error))
            .finally(() => {
                setLoading(false)
                return
            })
    }, []);

    return !loading ? (
        <>
            <div className='min-h-screen flex flex-col content-between bg-gray-600'>
                <Header />

                <main>
                    {/*TODO:*/} <Outlet />
                </main>


                <Footer />
            </div>
        </>
    ) : (null)
}

export default App
