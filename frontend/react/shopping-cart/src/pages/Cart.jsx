import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CartTile from '../components/Cart-tile';

function Cart() {
    const [totalCart, setTotalCart] = useState(0)
    const { cart } = useSelector((state) => state);

    useEffect(() => {
        setTotalCart(cart.reduce((acc, current) => acc + current.price, 0));
    }, [cart])

    console.log(cart, 'cart total: ', totalCart);

    return (
        <div>
            {
                cart && cart.length > 0 ?
                    <>
                        <div className='min-h-[80vh] grid md:grid-cols-2 max-w-6xl mx-auto'>
                            <div className='flex flex-col justify-center items-center p-3'>
                                {
                                    cart.map((cartItem) => (
                                        <CartTile id={cartItem.id} tileItem={cartItem} />
                                    ))

                                }
                            </div>
                        </div>
                        <div className='w-[300px]'>
                            <div className='flex flex-col justify-center items-end p-5 space-y-5 mt-14'>
                                <h1 className='font-bold font-lg text-red-800'>Your cart summary.</h1>
                                <p>
                                    <span className='text-gray-200 font-bold'>Total items:</span>
                                    <span>{cart.length}</span>
                                </p>
                                <p>
                                    <span className='text-gray-200 font-bold'>Total Price:</span>
                                    <span>{`$${totalCart.toFixed(2)}`}</span>
                                </p>
                            </div>
                        </div>
                    </>

                    :
                    <div className='min-h-[80vh] flex flex-col items-center justify-center'>
                        <h1 className='text-white font-bold text-xl mb-2'>Cart is empty! please add products to cart.</h1>
                        <Link className='text-blue-700 text-xl p-2 rounded-xl bg-gray-200 font-bold' to='/'>See all products</Link>
                    </div>
            }
        </div>

    )
}

export default Cart