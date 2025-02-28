import { useState, useEffect } from 'react'
import './loadmore.css'

function Loadmore() {

    const [productsState, setProducts] = useState([])
    const [loading, setloading] = useState(false)
    const [count, setCount] = useState(0)
    const [error, setError] = useState(null)
    const [disableButton, setDisableButton] = useState(false)

    const fetchData = async () => {
        try {
            setloading(true)
            const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${count === 0 ? 0 : count}`)

            const result = await response.json()

            if (result && result.products && result.products.length) {
                setProducts((prevProducts) => [...prevProducts, ...result.products])
                setloading(false)
            }
            console.log("result is:", result);
            console.log("products are:", productsState);
        } catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [count])

    useEffect(() => {
        if (productsState.length === 100) {
            setDisableButton(true)
        }
    }, [productsState])

    return (
        <div className='load-more-component-container'>
            <div className='product-container'>
                {
                    productsState.map((item, index) => (
                        <div className='product' key={index}>
                            <img src={item.thumbnail} alt={item.title} />
                            <h1 className='text-amber-600 font-bold'>{item.price}</h1>
                            <h2>{item.title}</h2>
                        </div>
                    ))
                }
            </div>
            <div className='mt-7 mb-25 load-more-container flex justify-center flex-col items-center'>
                <button className='text-2xl font-bold bg-blue-200 w-[200px] rounded-2xl hover:cursor-pointer' disabled={disableButton} onClick={() => setCount(count + 10)}>{loading ? "Loading..." : "Load more"}</button>
                {
                    disableButton && <p className='text-2xl text-center text-yellow-500'>You have reached the maximum limit of 100.</p>
                }

            </div>

            <p>{error}</p>
        </div >
    )
}

export default Loadmore