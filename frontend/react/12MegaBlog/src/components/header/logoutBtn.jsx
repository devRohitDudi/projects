import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {

    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout())
            })
    }
    return (
        <button className=' text-white inline-block px-6 py-2 duration-200 text-[20px] hover:bg-blue-100 hover:cursor-pointer hover:text-black rounded-full'
            onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn