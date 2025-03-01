import { useEffect, useState } from 'react'
import './scroll.css'

function Scroll() {
    const [productsState, setProducts] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState()
    const [scrollPercentage, setScrollPercentage] = useState(0)

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await fetch("https://dummyjson.com/products?limit=100&select=title,price")
            const newData = await response.json()
            if (newData && newData.products && newData.products.length > 0) {
                setProducts(newData.products)
                setLoading(false)
            }
        }
        catch (error) {
            setError(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])


    const handleScroll = () => {

        const howMuchScrolled = document.body.scrollTop || document.documentElement.scrollTop;

        const totalHeight = document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        setScrollPercentage((howMuchScrolled / totalHeight) * 100)
    }

    useEffect(() => {

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    console.log("percentage:", scrollPercentage);

    return (
        <>
            <div className="top-container">

                <div className='scroll-progress-tracking-container'>
                    <div
                        className='current-progress-bar'
                        style={{ width: `${scrollPercentage}%` }} >
                    </div>
                </div>
                <h1 className='bg-green-400 w-full text-center p-1 text-xl'>Custom Scroll Indicator</h1>

            </div >

            {
                loading ? <p className='text-xl'>Loading...</p> : null
            }
            <div className='flex gap-5 flex-col'>
                {productsState && productsState.length > 0 ?
                    productsState.map((item) => (
                        <p key={item.id}>{item.title}</p>
                    )) : null
                }
            </div>
            {
                error &&
                <p>Error occured! Mr. Rohit please check the code.</p>
            }
        </>
    )
}

export default Scroll
