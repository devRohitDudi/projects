import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout())
                navigate('/')

            })
    }
    return (
        <button className=' text-white text-sm inline-block px-4 py-2 duration-200 md:text-[20px] hover:bg-blue-100 hover:cursor-pointer hover:text-black rounded-full'
            onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn