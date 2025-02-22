import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {

    // let [products, loading, error] = CustomHookForQuery('/api/products')
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [searchButton, setButton] = useState(false)

    useEffect(() => {
        const controller = new AbortController()
            ; (async () => {
                try {
                    setLoading(true)
                    setError(false)

                    const response = await axios.get('/api/products?search=' + search
                        , { signal: controller.signal })

                    console.log(response.data);
                    setProducts(response.data)
                    setLoading(false)
                } catch (error) {
                    if (axios.isCancel(error)) {
                        console.log("request canceled: ", error.message);
                        return
                    }
                    setError(true)
                    setLoading(false)

                }
            })()
        return () => {
            controller.abort()
        }
    }, [searchButton])

    function CustomHookForQuery(url) {
        const [products, setProducts] = useState([])
        const [error, setError] = useState(false)
        const [loading, setLoading] = useState(false)

        useEffect(() => {
            ; (async () => {
                try {
                    setLoading(true)
                    setError(false)
                    const response = await axios.get(url)
                    console.log(response.data);
                    setProducts(response.data)
                    setLoading(false)
                } catch (error) {
                    setError(true)
                    setLoading(false)
                    console.log(error);

                }
            })()
        }, [])
        return [products, loading, error]
    }


    return (
        <>
            <h2>Products data fetched from backend </h2>

            <input value={search} placeholder="Enter keyword"
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={() => { setButton(!searchButton) }} >Search</button>
            {loading && <h1>Loading...</h1>}

            {error && <h1>Something went wrong.</h1>}

            {loading ? null : <h2>number of products is:{products.length ? products.length : "0"}</h2>}

        </>
    )
}

export default App


