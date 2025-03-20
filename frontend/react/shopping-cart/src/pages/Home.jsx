import React, { useEffect, useState } from 'react'
// import Product from '../index.js'
import Product from '../components/Product.jsx'
function Home() {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const responce = await fetch('https://fakestoreapi.com/products')
            const result = await responce.json()
            console.log(result);

            if (result && result.length > 0) {
                setProducts(result)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className='p-3 min-h-screen w-full bg-slate-700 flex flex-col justify-center items-center'>
            {
                error ? <h1>Error occured! {error}</h1> : null
            }
            {
                loading ? <h1>Loading...</h1> : null
            }
            <div className='flex flex-wrap container mx-auto justify-center gap-5'>
                {products && products.length &&
                    products.map(product => (
                        <Product key={product.id} value={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default Home