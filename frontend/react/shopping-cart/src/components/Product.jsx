import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../store/cart-slice'

function Product({ value }) {
    const { cart } = useSelector(state => state)
    const dispatch = useDispatch()


    const handleAddToCart = () => {
        dispatch(addToCart(value))
        console.log("Added to cart: ", value);
    }
    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(value.id))
        console.log("removed from cart");
    }

    return (
        <div className='w-70 border-amber-700 border-1 bg-gray-300 flex flex-col p-3 gap-2 rounded-xl items-center'>
            <img className='h-30 rounded-xl' src={value?.image} alt="" />
            <h2 className='text-black'>{value?.title}</h2>

            <div className='w-full flex justify-between  items-center'>
                <h1 className='text-blue-700 shadow-black font-bold'>${value?.price}</h1>
                <button onClick={cart.some(item => item.id === value.id) ? handleRemoveFromCart : handleAddToCart} className='bg-green-600 p-1 hover:cursor-pointer pl-2 pr-2 rounded-xl font-bold'
                >
                    {
                        cart.some(item => item.id === value?.id) ?
                            'remove from cart' : 'Add to cart'
                    }
                </button>
            </div>
        </div>
    )
}

export default Product