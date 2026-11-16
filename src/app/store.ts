import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "../features/cart/cartSlice"
import { cartStorageMiddleware } from "../features/cart/services/cartStorageMiddleware"
import { productApi } from "../features/products/services/productsApi"
import productSlice from "../features/products/ProductSlice"

const store = configureStore({
    reducer: {
        cart: cartSlice,
        [productApi.reducerPath]: productApi.reducer,
        products: productSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(cartStorageMiddleware)
            .concat(productApi.middleware),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
