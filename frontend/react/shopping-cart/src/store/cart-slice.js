import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart(state, action) {
            // console.log(action);
            state.push(action.payload)
        },
        removeFromCart(state, action) {
            // we are assing the id to action.payload
            return state.filter(item => item.id !== action.payload)
        },

    }
})
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer