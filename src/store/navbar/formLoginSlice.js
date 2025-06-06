import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

export const formLoginSlice = createSlice({
    name: 'openFormLogin',
    initialState,
    reducers: {
        open: (state) => {
            state.isOpen = true
        },
        close: (state) => {
            state.isOpen = false
        },
    }
})

export const { open, close } = formLoginSlice.actions
export default formLoginSlice.reducer