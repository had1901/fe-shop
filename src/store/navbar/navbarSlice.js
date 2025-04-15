import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isToggle: false
}

export const navbarSlice = createSlice({
    name: 'toggleNavbar',
    initialState,
    reducers: {
        toggle: (state) => {
            state.isToggle = !state.isToggle
        }
    }
})

export const { toggle } = navbarSlice.actions
export default navbarSlice.reducer