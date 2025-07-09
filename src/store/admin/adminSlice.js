import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'light',
    
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload
        },
    }
})

export const { 
    setTheme,  

} = adminSlice.actions
export default adminSlice.reducer