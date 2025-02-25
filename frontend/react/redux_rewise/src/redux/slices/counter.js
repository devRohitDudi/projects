import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
    totalValue: 0
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: ((state) => {
            state.value += 1
        }),
        decrement: ((state) => {
            state.value -= 1
        }),
        incrementByValue: ((state, action) => {
            state.value += Number(action.payload),
                state.totalValue = action.payload
        }),
    }
})

export const { increment, decrement, incrementByValue } = counterSlice.actions

export default counterSlice.reducer
