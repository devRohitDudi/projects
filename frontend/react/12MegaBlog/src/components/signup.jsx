import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from "react";
import authService from "../appwrite/auth";
import dispatch from "react-redux";
import { login } from "../store/authSlice";
import { Logo, Input } from "./index";

function Signup() {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [register, handleSubmit] = useForm()
    const [loading, setLoading] = useState(false)

    const handleSignup = async (data) => {
        setError("")
        try {
            const session = await authService.createAccount(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login(userData))
                    navigate('/')
                }
            }

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        
    )
}