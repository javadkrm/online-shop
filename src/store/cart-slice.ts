import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
    id: number,
    title: string,
    price: number,
    count: number,
    image ?: string
}

type cartState = {
    items: CartItem[]
}

const initialState: cartState = {
    items: [{
        id: 1,
        title: 'iPhone 18',
        price: 10000,
        count: 200
    }]
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const mainItemIndex = state.items.findIndex(item => item.id === action.payload.id)
            if (mainItemIndex >= 0) {
                state.items[mainItemIndex].count++
            }
            else {
                state.items.push({ ...action.payload, count: 1 })
            }
        },
        removeFromCart(state, action: PayloadAction<number>) {
            const mainItemIndex = state.items.findIndex(item => item.id === action.payload)
            if (state.items[mainItemIndex].count === 1) {
                state.items.splice(mainItemIndex, 1)
            }
            else {
                state.items[mainItemIndex].count--
            }
        }
    }
})

export default cartSlice

export const { addToCart, removeFromCart } = cartSlice.actions