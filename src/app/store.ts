import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "../features/cart/cartSlice"
import { cartStorageMiddleware } from "../features/cart/services/cartStorageMiddleware"
import { productsApi } from "../features/products/services/productsApi"
import productSlice from "../features/products/ProductSlice"
import feedbackSlice from "../features/feedback/feedbackSlice"

const store = configureStore({
    reducer: {
        cart: cartSlice,
        [productsApi.reducerPath]: productsApi.reducer,
        products: productSlice,
        feedback : feedbackSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(cartStorageMiddleware)
            .concat(productsApi.middleware),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
