import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState } from "./types/CartItem";

const savedCart = localStorage.getItem("cart");

const initialState: CartState = {
    items: savedCart ? JSON.parse(savedCart) : [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const mainItemIndex = state.items.findIndex(item => item.id === action.payload.id)
            if (mainItemIndex >= 0) {
                state.items[mainItemIndex].quantity++
            }
            else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
        },
        removeFromCart(state, action: PayloadAction<number>) {
            const mainItemIndex = state.items.findIndex(item => item.id === action.payload)
            if (mainItemIndex === -1) {
                return
            }

            if (state.items[mainItemIndex].quantity === 1) {
                state.items.splice(mainItemIndex, 1)
            }
            else {
                state.items[mainItemIndex].quantity--
            }
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ id: number; quantity: number }>
        ) => {
            const { id, quantity } = action.payload;

            if (quantity <= 0) {
                state.items = state.items.filter(
                    item => item.id !== id
                );
                return;
            }

            const item = state.items.find(item => item.id === id);

            if (item) {
                item.quantity = quantity;
            }
        },

        clearCart(state) {
            state.items = []
        }
    }
})

export default cartSlice.reducer

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions // action creators