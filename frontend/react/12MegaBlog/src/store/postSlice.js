import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        posts: (state, action) => {
            state.status = true
            state.userData = action.payload.userData
        },
    }
})

export const { posts } = postSlice.actions

export default postSlice.reducer