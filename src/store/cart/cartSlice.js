import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: [],
    infoCustomer: {},
    listCart: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const {id, quantity} = action.payload
            const indexProduct = state.carts.findIndex(item => item.id === id)
            if(indexProduct !== -1) {
                state.carts[indexProduct].quantity += quantity
            } else {
                state.carts.push(action.payload)
            }
            
        },
        deleteToCart: (state, action) => {
            console.log(action.payload)
            const newCarts = state.carts.filter(item => item.id !== action.payload)
            state.carts = newCarts

        },
        inCreaseQuantity: (state, action) => {
            const {productId, quantity} = action.payload
            const product = state.carts.findIndex(item => item.id === productId)
            if(product !== -1) {
                state.carts[product].quantity += quantity
            }
        },
        reduceQuantity: (state, action) => {
            const {productId, quantity} = action.payload
            const product = state.carts.findIndex(item => item.id === productId)
            if(product !== -1) {
                if(state.carts[product].quantity > 0) {
                    state.carts[product].quantity -= quantity
                }
            }
        },
        setInfoCustomer: (state, action) => {
            state.infoCustomer = action.payload
        },
        // setCarts: (state, action) => {
        //     if(action.payload.length) {
        //         action.payload.map(item => {
        //             return state.carts.push(item)
        //         })

        //     }
        // }

    }
})

export const { addToCart, deleteToCart, inCreaseQuantity, reduceQuantity, setInfoCustomer, setCarts } = cartSlice.actions
export default cartSlice.reducer