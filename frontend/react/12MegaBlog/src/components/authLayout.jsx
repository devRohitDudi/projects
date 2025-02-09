import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'

export default function AuthLayout({ children, authentication }) {

    const authStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)

    useEffect(() => {

        //easier way
        // if (authStatus === false) {
        //     navigate("/login")
        // }
        // else if (authStatus === true) {
        //     navigate("/")
        // }

        if (authentication && authStatus !== authentication) {
            navigate('/login')
        }

        else if (!authentication && authStatus !== authentication) {
            navigate('/')
        }
        setLoader(false)


    }, [authentication, navigate, authStatus])


    return loader ? <h1>Loading...</h1> : <>{children} </>
}

