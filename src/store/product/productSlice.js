import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info: null
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.info = action.payload
        },
       
    }
})

export const { setProduct } = productSlice.actions
export default productSlice.reducer