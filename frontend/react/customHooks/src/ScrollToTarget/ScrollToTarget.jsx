import React, { useEffect, useState } from 'react'

function ScrollToTarget() {
    const [products, setProducts] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await fetch(`https://dummyjson.com/products?limit=100&select=title,price`)
            const result = await response.json()
            console.log(result);

            if (result && result.products && result.products.length > 0) {
                setProducts(result.products)
                console.log(products);
                setLoading(false)
            }
        } catch (error) {
            setError(error)
            console.log('Error:', error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    const scrollToBottom = () => {
        window.scrollTo(
            {
                top: document.documentElement.scrollHeight,
                left: 0, behavior: 'smooth'
            }
        )
    }
    const scrollToTop = () => {
        window.scrollTo(
            {
                top: 0, left: 0, behavior: 'smooth'
            }
        )
    }

    return (
        <div className='flex flex-col gap-5 bg-slate-600 text-white justify-center items-center min-h-screen w-full p-5'>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}

            <div className='flex flex-col items-center  gap-8 '>

                <button className='bg-green-700 hover:cursor-pointer text-l rounded-xl pt-2 pb-2 pl-4 pr-4 \ font-bold' onClick={scrollToBottom}>Scroll to Bottom</button>

                <div className='flex flex-col gap-3'>
                    {
                        products && products.length > 0 ? products.map((product) => (
                            <div key={product.id} className='flex justify-between bg-slate-900 p-3 rounded-xl gap-3'>
                                <h1>{product.title}</h1>
                                <h1 className='text-l text-yellow-400 font-bold'>{product.price}</h1>
                            </div>
                        )) : <p>Updating state....</p>
                    }
                </div>

                <button className='bg-green-700 hover:cursor-pointer text-l rounded-xl pt-2 pb-2 pl-4 pr-4 mb-5 font-bold' onClick={scrollToTop}>Scroll to Top</button>

            </div>

        </div>
    )
}

export default ScrollToTarget