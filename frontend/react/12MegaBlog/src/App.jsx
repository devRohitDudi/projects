import { useState, useEffect } from 'react'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, logout } from './store/authSlice'
import { Header, Footer, Button } from './components'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


function App() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    // const [posts, setPosts] = useState([])
    const dispatch = useDispatch()

    const authStatus = useSelector(state => state.auth.status)

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
            <div className='relative min-h-screen  bg-gray-600'>
                {authStatus && <button className='bg-blue-800 text-white font-bold p-2 rounded-2xl absolute bottom-5 right-5 z-10'
                    onClick={navigate('/')}>Create</button>}
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
