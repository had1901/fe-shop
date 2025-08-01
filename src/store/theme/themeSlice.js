import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    background: '#fff',
    color: '#333333'
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setDarkMode: (state) => {
            state.background = '#3b3b3b'
            state.color = '#fff'
        },
        setLightMode: (state) => {
            state.background = '#fff'
            state.color = '#333333'
        },
    }
})

export const { 
    setDarkMode, 
    setLightMode, 

} = themeSlice.actions
export default themeSlice.reducer