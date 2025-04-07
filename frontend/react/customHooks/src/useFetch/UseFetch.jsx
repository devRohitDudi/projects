import React, { useState, useEffect } from 'react'

function UseFetch({ url, options = {} }) {
    const [data, setData] = useState(null)
    const [pending, setPending] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        setPending(true)
        try {
            const response = await fetch(url, { ...options })
            const responseText = await response.text()
            console.log("responsetext:", responseText);

            if (!response.ok) throw new Error(response.statusText)

            const result = await response.json()
            setData(result)

            // try {
            //     const data = JSON.parse(responseText)
            //     setData(data)
            // } catch (jsonError) {
            //     throw new Error("Invalid Json response:", jsonError)
            // }

            setError(null)
            setPending(false)
        } catch (error) {
            setError(error)
            setPending(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return { data, error, pending }

}

export default UseFetch