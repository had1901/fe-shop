import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: [],
    infoCustomer: {},
    listCart: [],
    isLoading: false,
    total: 0,
    selected: 'cod',
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // addToCart: (state, action) => {
        //     const {id, quantity} = action.payload
        //     const indexProduct = state.carts.findIndex(item => item.id === id)
        //     if(indexProduct !== -1) {
        //         state.carts[indexProduct].quantity += quantity
        //     } else {
        //         state.carts.push(action.payload)
        //     }
            
        // },
        // deleteToCart: (state, action) => {
        //     console.log(action.payload)
        //     const newCarts = state.carts.filter(item => item.id !== action.payload)
        //     state.carts = newCarts

        // },
        // inCreaseQuantity: (state, action) => {
        //     const {productId, quantity} = action.payload
        //     const product = state.carts.findIndex(item => item.id === productId)
        //     if(product !== -1) {
        //         state.carts[product].quantity += quantity
        //     }
        // },
        // reduceQuantity: (state, action) => {
        //     const {productId, quantity} = action.payload
        //     const product = state.carts.findIndex(item => item.id === productId)
        //     if(product !== -1) {
        //         if(state.carts[product].quantity > 0) {
        //             state.carts[product].quantity -= quantity
        //         }
        //     }
        // },
        setInfoCustomer: (state, action) => {
            state.infoCustomer = action.payload
        },
        setCarts: (state, action) => {
            if(action.payload.length) {
                state.carts = action.payload
            }
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setTotal: (state, action) => {
            state.total = action.payload
        },
        setSelected: (state, action) => {
            state.selected = action.payload
        }
    }
})

export const { 
    addToCart, 
    deleteToCart, 
    inCreaseQuantity, 
    reduceQuantity, 
    setInfoCustomer, 
    setCarts, 
    setLoading, 
    setTotal,
    setSelected, 

} = cartSlice.actions
export default cartSlice.reducer