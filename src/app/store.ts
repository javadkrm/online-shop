import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "../features/cart/cartSlice"
import cartStorageMiddleware from "../features/cart/services/cartStorageMiddleware"

const store = configureStore({
    reducer: {
        cart: cartSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(cartStorageMiddleware),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
