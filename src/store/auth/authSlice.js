import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.info = action.payload
        },
        logout: (state) => {
            state.info = null
        },
    }
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer