import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../store/cart-slice'

function CartTile({ tileItem }) {

    const dispatch = useDispatch()

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(tileItem.id))
        console.log("removed from cart");
    }

    return (
        <div className='flex items-center p-5 justify-between bg-red-500 mt-2 mb-2 rounded-xl '>

            <div className='flex p-3'>
                <img src={tileItem?.image} alt={tileItem?.title} />
                <div className='ml-10 self-start space-y-5'>
                    <h1 className='text-white text-xl font-bold'>{tileItem?.title}</h1>
                    <h1 className='text-white font-extrabold'>{tileItem?.price}</h1>
                </div>
            </div>

            <div>
                <button onClick={handleRemoveFromCart} className='bg-green-600 p-1 hover:cursor-pointer pl-2 pr-2 rounded-xl font-bold'
                >
                    Remove from cart
                </button>
            </div>
        </div>
    )
}

export default CartTile